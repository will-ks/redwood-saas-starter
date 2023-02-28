import type { OrganizationRole } from '@prisma/client'

import {
  organizationRoles,
  organizationRole,
  createOrganizationRole,
  updateOrganizationRole,
  deleteOrganizationRole,
} from './organizationRoles'
import type { StandardScenario } from './organizationRoles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('organizationRoles', () => {
  scenario(
    'returns all organizationRoles',
    async (scenario: StandardScenario) => {
      const result = await organizationRoles()

      expect(result.length).toEqual(
        Object.keys(scenario.organizationRole).length
      )
    }
  )

  scenario(
    'returns a single organizationRole',
    async (scenario: StandardScenario) => {
      const result = await organizationRole({
        id: scenario.organizationRole.one.id,
      })

      expect(result).toEqual(scenario.organizationRole.one)
    }
  )

  scenario('creates a organizationRole', async (scenario: StandardScenario) => {
    const result = await createOrganizationRole({
      input: {
        roleType: 'String',
        organizationMembershipId:
          scenario.organizationRole.two.organizationMembershipId,
      },
    })

    expect(result.roleType).toEqual('String')
    expect(result.organizationMembershipId).toEqual(
      scenario.organizationRole.two.organizationMembershipId
    )
  })

  scenario('updates a organizationRole', async (scenario: StandardScenario) => {
    const original = (await organizationRole({
      id: scenario.organizationRole.one.id,
    })) as OrganizationRole
    const result = await updateOrganizationRole({
      id: original.id,
      input: { roleType: 'String2' },
    })

    expect(result.roleType).toEqual('String2')
  })

  scenario('deletes a organizationRole', async (scenario: StandardScenario) => {
    const original = (await deleteOrganizationRole({
      id: scenario.organizationRole.one.id,
    })) as OrganizationRole
    const result = await organizationRole({ id: original.id })

    expect(result).toEqual(null)
  })
})
