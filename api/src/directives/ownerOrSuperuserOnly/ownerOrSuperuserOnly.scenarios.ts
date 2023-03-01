import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { authenticationProviderId: 'String9174630' } },
    two: { data: { authenticationProviderId: 'String6782945' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
