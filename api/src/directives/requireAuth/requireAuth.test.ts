// eslint-disable-next-line import/no-extraneous-dependencies
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { getDirectiveName, mockRedwoodDirective } from '@redwoodjs/testing/api'
import { UserRoleType } from 'src/lib/models'

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

  it('throws AuthenticationError with unexpected currentUser structure', () => {
    // @ts-expect-error currentUser structure is wrong
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {
          wrongKey: 'something',
        },
      },
    })
    expect(mockExecution).toThrowError(AuthenticationError)
  })

  it('doesnt throw when context.currentUser is set (to anything)', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {
          userId: 'something',
          roles: [UserRoleType.Standard],
        },
      },
    })
    expect(mockExecution).not.toThrowError()
  })
})
