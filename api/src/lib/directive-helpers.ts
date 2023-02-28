import { AuthenticationError } from '@redwoodjs/graphql-server'
import assert from 'assert'
import { AssertedCurrentUser } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const getAssertedCurrentUser = () => {
  try {
    assert(context.currentUser)
    return context.currentUser as AssertedCurrentUser
  } catch (error) {
    logger.info('User not authenticated', error)
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
