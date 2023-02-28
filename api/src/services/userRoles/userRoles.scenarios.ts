import type { Prisma, UserRole } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserRoleCreateArgs>({
  userRole: {
    one: {
      data: {
        roleType: 'String',
        user: {
          create: {
            authenticationProviderType: 'String',
            authenticationProviderId: 'String4367288',
          },
        },
      },
    },
    two: {
      data: {
        roleType: 'String',
        user: {
          create: {
            authenticationProviderType: 'String',
            authenticationProviderId: 'String9030258',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserRole, 'userRole'>
