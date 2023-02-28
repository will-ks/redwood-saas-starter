import type { Prisma, OrganizationMembership } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationMembershipCreateArgs>(
  {
    organizationMembership: {
      one: {
        data: {
          user: {
            create: {
              authenticationProviderType: 'String',
              authenticationProviderId: 'String1765800',
            },
          },
          organization: { create: { name: 'String' } },
        },
      },
      two: {
        data: {
          user: {
            create: {
              authenticationProviderType: 'String',
              authenticationProviderId: 'String9631972',
            },
          },
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
