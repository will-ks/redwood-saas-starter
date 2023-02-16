import { db } from 'api/src/lib/db'
import { OrganizationRoleType, UserRoleType } from 'shared-data/src'

export default async () => {
  const [standardUser1, standardUser2, superUser] = await Promise.all(
    [
      {
        id: 'seeded-standard-user',
        roleType: UserRoleType.Standard,
      },
      {
        id: 'seeded-standard-user-2',
        roleType: UserRoleType.Standard,
      },
      {
        id: 'seeded-super-user',
        roleType: UserRoleType.SuperUser,
      },
    ].map(({ id, roleType }) =>
      db.user.upsert({
        where: {
          id,
        },
        create: {
          id,
          email: `${id}@example.com`,
          userRoles: {
            create: {
              roleType,
            },
          },
        },
        update: {},
      })
    )
  )
  const organization = await db.organization.upsert({
    where: {
      id: 'seeded-organization',
    },
    create: {
      id: 'seeded-organization',
      memberships: {
        create: [
          {
            user: {
              connect: {
                id: standardUser1.id,
              },
            },
            organizationRoles: {
              create: {
                roleType: OrganizationRoleType.Owner,
              },
            },
          },
          {
            user: {
              connect: {
                id: standardUser2.id,
              },
            },
            organizationRoles: {
              create: {
                roleType: OrganizationRoleType.Collaborator,
              },
            },
          },
          {
            user: {
              connect: {
                id: superUser.id,
              },
            },
            organizationRoles: {
              create: {
                roleType: OrganizationRoleType.Admin,
              },
            },
          },
        ],
      },
    },
    update: {},
  })
  console.log('Seeded database.')
}
