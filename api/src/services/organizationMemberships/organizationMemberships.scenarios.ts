import type { Prisma, OrganizationMembership } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationMembershipCreateArgs>(
  {
    organizationMembership: {
      one: {
        data: {
          user: { create: { authenticationProviderId: 'String5680014' } },
          organization: { create: { name: 'String' } },
        },
      },
      two: {
        data: {
          user: { create: { authenticationProviderId: 'String8200760' } },
          organization: { create: { name: 'String' } },
        },
      },
    },
  }
)

export type StandardScenario = ScenarioData<
  OrganizationMembership,
  'organizationMembership'
>
