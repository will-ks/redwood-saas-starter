import type { OrganizationMembership } from '@prisma/client'

import {
  organizationMemberships,
  organizationMembership,
  createOrganizationMembership,
  updateOrganizationMembership,
  deleteOrganizationMembership,
} from './organizationMemberships'
import type { StandardScenario } from './organizationMemberships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('organizationMemberships', () => {
  scenario(
    'returns all organizationMemberships',
    async (scenario: StandardScenario) => {
      const result = await organizationMemberships()

      expect(result.length).toEqual(
        Object.keys(scenario.organizationMembership).length
      )
    }
  )

  scenario(
    'returns a single organizationMembership',
    async (scenario: StandardScenario) => {
      const result = await organizationMembership({
        id: scenario.organizationMembership.one.id,
      })

      expect(result).toEqual(scenario.organizationMembership.one)
    }
  )

  scenario(
    'creates a organizationMembership',
    async (scenario: StandardScenario) => {
      const result = await createOrganizationMembership({
        input: {
          userId: scenario.organizationMembership.two.userId,
          organizationId: scenario.organizationMembership.two.organizationId,
        },
      })

      expect(result.userId).toEqual(scenario.organizationMembership.two.userId)
      expect(result.organizationId).toEqual(
        scenario.organizationMembership.two.organizationId
      )
    }
  )

  scenario(
    'updates a organizationMembership',
    async (scenario: StandardScenario) => {
      const original = (await organizationMembership({
        id: scenario.organizationMembership.one.id,
      })) as OrganizationMembership
      const result = await updateOrganizationMembership({
        id: original.id,
        input: { userId: scenario.organizationMembership.two.userId },
      })

      expect(result.userId).toEqual(scenario.organizationMembership.two.userId)
    }
  )

  scenario(
    'deletes a organizationMembership',
    async (scenario: StandardScenario) => {
      const original = (await deleteOrganizationMembership({
        id: scenario.organizationMembership.one.id,
      })) as OrganizationMembership
      const result = await organizationMembership({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
