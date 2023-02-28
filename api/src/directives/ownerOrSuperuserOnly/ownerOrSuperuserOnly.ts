import {
  AuthenticationError,
  createValidatorDirective,
  ForbiddenError,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'
import { getAssertedCurrentUser } from 'src/lib/directive-helpers'
import { logger } from 'src/lib/logger'
import { UserRoleType } from 'src/lib/models'

export const schema = gql`
  """
  Use to check whether or not the user owns the requested object or is a superuser.
  """
  directive @ownerOrSuperuserOnly(userIdKey: String!) on FIELD_DEFINITION
`

const validate: ValidatorDirectiveFunc = async (args) => {
  const { supertokensProviderId } = getAssertedCurrentUser()
  const currentUser = await db.user.findUniqueOrThrow({
    where: { authenticationProviderId: supertokensProviderId },
    include: {
      userRoles: true,
    },
  })

  const userIdKey = args.directiveArgs.userIdKey

  if (typeof userIdKey !== 'string') {
    logger.error('Expected a string value for directiveArgs.userIdKey')
    throw new AuthenticationError('Something went wrong, try again later.')
  }

  const previousReturn = args.root // The previous return in the resolver chain
  if (!previousReturn) {
    logger.error(
      'You can only use @ownerOrAdminOnly on fields for non-root types, e.g. not Query/Mutation.'
    )
    throw new AuthenticationError('Something went wrong, try again later.')
  }

  const previousReturnUserId =
    typeof previousReturn === 'object' &&
    userIdKey in previousReturn &&
    (previousReturn as { [key: string]: unknown })[userIdKey]
  if (!previousReturnUserId) {
    logger.error(`Previous return doesn't have a value at ${userIdKey}`)
    throw new AuthenticationError('Something went wrong, try again later.')
  }

  const isOwnedByCurrentUser = previousReturnUserId === currentUser.id
  const currentUserIsSuperUser = currentUser.userRoles.some(
    (role) => role.roleType === UserRoleType.SuperUser
  )
  if (!isOwnedByCurrentUser && !currentUserIsSuperUser) {
    throw new ForbiddenError(
      "You don't have permission to access the requested data"
    )
  }
}

const ownerOrAdminOnly = createValidatorDirective(schema, validate)

export default ownerOrAdminOnly
