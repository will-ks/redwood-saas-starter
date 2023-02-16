// eslint-disable-next-line import/no-extraneous-dependencies
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { getDirectiveName, mockRedwoodDirective } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('throws AuthenticationError by default', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {})
    expect(mockExecution).toThrowError(AuthenticationError)
  })

  it('doesnt throw when context.currentUser is set (to anything)', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {},
      },
    })
    expect(mockExecution).not.toThrowError()
  })
})
