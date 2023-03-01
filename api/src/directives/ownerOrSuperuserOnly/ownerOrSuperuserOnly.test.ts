import { ForbiddenError } from '@redwoodjs/graphql-server'
import { getDirectiveName, mockRedwoodDirective } from '@redwoodjs/testing/api'
import { StandardScenario } from 'src/directives/ownerOrSuperuserOnly/ownerOrSuperuserOnly.scenarios'
import { UserRoleType } from 'src/lib/models'
import { user } from 'src/services/users/users'

import ownerOrSuperuserOnly from './ownerOrSuperuserOnly'

describe('ownerOrSuperuserOnly directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(ownerOrSuperuserOnly.schema).toBeTruthy()
    expect(getDirectiveName(ownerOrSuperuserOnly.schema)).toBe(
      'ownerOrSuperuserOnly'
    )
  })

  it('throws ForbiddenError by default', async () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {})
    await expect(mockExecution()).rejects.toThrow(ForbiddenError)
  })

  it('throws ForbiddenError with unexpected arguments', async () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {
      directiveArgs: {
        wrongArg: 'something',
      },
    })
    await expect(mockExecution()).rejects.toThrow(ForbiddenError)
  })

  it('throws by default for regular user', async () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {
      directiveArgs: {
        userIdKey: 'something',
      },
      context: {
        currentUser: {
          userId: 'something',
          roles: [UserRoleType.Standard],
        },
      },
    })
    await expect(mockExecution()).rejects.toThrow(ForbiddenError)
  })

  it('resolves for superuser user', async () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {
      directiveArgs: {
        userIdKey: 'something',
      },
      context: {
        currentUser: {
          userId: 'something',
          roles: [UserRoleType.SuperUser],
        },
      },
    })
    await expect(mockExecution()).resolves.not.toThrow()
  })

  it('throws for non-top level query when user is not owner', async () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {
      directiveArgs: {
        userIdKey: 'userId',
      },
      args: {
        root: {
          something: 'something',
          userId: 'owner-key',
        },
      },
      context: {
        currentUser: {
          userId: 'not-owner',
          roles: [UserRoleType.Standard],
        },
      },
    })
    await expect(mockExecution()).rejects.toThrow(ForbiddenError)
  })

  it('resolves for non-top level query when user is owner', async () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {
      directiveArgs: {
        userIdKey: 'userId',
      },
      root: {
        something: 'something',
        userId: 'owner-key',
      },
      context: {
        currentUser: {
          userId: 'owner-key',
          roles: [UserRoleType.Standard],
        },
      },
    })
    await expect(mockExecution()).resolves.not.toThrow()
  })

  it('throws for top level query when user is not owner', async () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {
      directiveArgs: {
        userIdKey: 'userId',
        objectFetcherName: 'user',
      },
      context: {
        currentUser: {
          userId: 'not-owner',
          roles: [UserRoleType.Standard],
        },
      },
    })
    await expect(mockExecution()).rejects.toThrow(ForbiddenError)
  })

  scenario(
    'resolves for top level query when user is owner',
    async (scenario: StandardScenario) => {
      const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {
        args: {
          id: scenario.user.one.id,
        },
        directiveArgs: {
          userIdKey: 'id',
          objectFetcherName: 'user',
        },
        context: {
          currentUser: {
            userId: scenario.user.one.id,
            roles: [UserRoleType.Standard],
          },
        },
      })

      await expect(mockExecution()).resolves.not.toThrow()
    }
  )
})
