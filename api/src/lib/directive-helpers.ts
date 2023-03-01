import { AuthenticationError } from '@redwoodjs/graphql-server'
import assert from 'assert'
import { isCurrentUser } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const getAssertedCurrentUser = () => {
  try {
    const { currentUser } = context
    assert(currentUser)
    if (!isCurrentUser(context.currentUser)) {
      logger.error('Unexpected context.currentUser structure')
      throw new Error('Unexpected context.currentUser structure')
    }
    return context.currentUser
  } catch (error) {
    logger.info('User not authenticated', error)
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
