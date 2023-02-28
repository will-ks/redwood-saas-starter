import type { Prisma, OrganizationRole } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationRoleCreateArgs>({
  organizationRole: {
    one: {
      data: {
        roleType: 'String',
        organizationMembership: {
          create: {
            user: {
              create: {
                authenticationProviderType: 'String',
                authenticationProviderId: 'String5335815',
              },
            },
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
            user: {
              create: {
                authenticationProviderType: 'String',
                authenticationProviderId: 'String9362015',
              },
            },
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
