import type { Prisma, UserRole } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserRoleCreateArgs>({
  userRole: {
    one: {
      data: {
        roleType: 'String',
        user: { create: { authenticationProviderId: 'String2516776' } },
      },
    },
    two: {
      data: {
        roleType: 'String',
        user: { create: { authenticationProviderId: 'String9532831' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserRole, 'userRole'>
