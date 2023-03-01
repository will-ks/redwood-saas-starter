import {
  AuthenticationError,
  createValidatorDirective,
  ForbiddenError,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server'
import { getAssertedCurrentUser } from 'src/lib/directive-helpers'
import { logger } from 'src/lib/logger'
import { UserRoleType } from 'src/lib/models'
import { organizationMembership } from 'src/services/organizationMemberships/organizationMemberships'
import { organizationRole } from 'src/services/organizationRoles/organizationRoles'
import { organization } from 'src/services/organizations/organizations'
import { userRole } from 'src/services/userRoles/userRoles'
import { user } from 'src/services/users/users'

export const schema = gql`
  """
  Use to check whether or not the user owns the requested object or is a superuser.
  """
  directive @ownerOrSuperuserOnly(
    userIdKey: String!
    objectFetcherName: String
  ) on FIELD_DEFINITION
`

const OBJECT_FETCHERS = {
  organizationMembership,
  organization,
  organizationRole,
  userRole,
  user,
}

type ObjectFetcher = keyof typeof OBJECT_FETCHERS

const isObjectFetcherName = (toCheck: unknown): toCheck is ObjectFetcher =>
  typeof toCheck === 'string' && Object.keys(OBJECT_FETCHERS).includes(toCheck)

const validate: ValidatorDirectiveFunc = async (args) => {
  const { userIdKey, objectFetcherName } = args.directiveArgs
  if (typeof userIdKey !== 'string') {
    logger.error('Expected a string value for directiveArgs.userIdKey')
    throw new AuthenticationError('Something went wrong, try again later.')
  }

  const { userId: currentUserId, roles: currentUserRoles } =
    getAssertedCurrentUser()

  const currentUserIsSuperUser = currentUserRoles.includes(
    UserRoleType.SuperUser
  )

  if (currentUserIsSuperUser) {
    logger.info(
      `Skipping ownership checks because user ${currentUserId} is superuser`
    )
    return
  }

  const objectToCheckOwnershipOf = await (async () => {
    const previousReturn = args.root // The previous return in the resolver chain
    if (typeof previousReturn === 'object') {
      // We're not in a top level query (mutation / query) so we can check the previous return
      return previousReturn
    }
    // We're in a top level query, so we need to fetch the object from the database.
    const idToQuery = args.args.id
    if (typeof idToQuery !== 'string') {
      logger.error(`Expected a value for args.args.id`)
      throw new AuthenticationError('Something went wrong, try again later.')
    }
    if (!isObjectFetcherName(objectFetcherName)) {
      logger.error(`Couldn't map ${objectFetcherName} to a an object fetcher`)
      throw new AuthenticationError('Something went wrong, try again later.')
    }
    return OBJECT_FETCHERS[objectFetcherName]({
      id: idToQuery,
    })
  })()

  if (!objectToCheckOwnershipOf) {
    logger.error(`Couldn't find an object to check ownership of.`)
    throw new AuthenticationError('Something went wrong, try again later.')
  }

  const previousReturnUserId =
    typeof objectToCheckOwnershipOf === 'object' &&
    userIdKey in objectToCheckOwnershipOf &&
    (objectToCheckOwnershipOf as { [key: string]: unknown })[userIdKey]
  if (!previousReturnUserId) {
    logger.error(
      `Object to check ownership doesn't have a value at ${userIdKey}`
    )
    throw new AuthenticationError('Something went wrong, try again later.')
  }

  const isOwnedByCurrentUser = previousReturnUserId === currentUserId

  if (isOwnedByCurrentUser) {
    return
  }

  throw new ForbiddenError("You don't have permission to do this")
}

const ownerOrAdminOnly = createValidatorDirective(schema, validate)

export default ownerOrAdminOnly
