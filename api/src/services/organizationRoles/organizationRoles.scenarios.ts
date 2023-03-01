import type { Prisma, OrganizationRole } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationRoleCreateArgs>({
  organizationRole: {
    one: {
      data: {
        roleType: 'String',
        organizationMembership: {
          create: {
            user: { create: { authenticationProviderId: 'String5133776' } },
            organization: { create: { name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        roleType: 'String',
        organizationMembership: {
          create: {
            user: { create: { authenticationProviderId: 'String3415973' } },
            organization: { create: { name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  OrganizationRole,
  'organizationRole'
>
