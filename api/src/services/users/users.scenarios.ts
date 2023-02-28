import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        authenticationProviderType: 'String',
        authenticationProviderId: 'String77933',
      },
    },
    two: {
      data: {
        authenticationProviderType: 'String',
        authenticationProviderId: 'String5120334',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
