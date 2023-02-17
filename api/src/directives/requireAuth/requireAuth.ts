import {
  AuthenticationError,
  createValidatorDirective,
} from '@redwoodjs/graphql-server'
import assert from 'assert'
// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag'
import { logger } from 'src/lib/logger'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated.
  """
  directive @requireAuth on FIELD_DEFINITION
`

const requireAuth = createValidatorDirective(schema, () => {
  try {
    assert(context.currentUser)
  } catch (error) {
    logger.info('User not authenticated', error)
    throw new AuthenticationError("You don't have permission to do that.")
  }
})

export default requireAuth
