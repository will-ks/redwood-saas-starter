import { db } from 'api/src/lib/db'
import pAll from 'p-all'
import { OrganizationRoleType, UserRoleType } from 'shared-data/src'

export default async () => {
  // User pAll with concurrency: 1 instead of Promise.all due to https://github.com/prisma/prisma/issues/10306
  const [standardUser1, standardUser2, superUser] = await pAll(
    [
      {
        id: 'seeded-standard-user',
        roleType: UserRoleType.Standard,
        authenticationProviderId: 'nonexistant1',
      },
      {
        id: 'seeded-standard-user-2',
        roleType: UserRoleType.Standard,
        authenticationProviderId: 'nonexistant2',
      },
      {
        id: 'seeded-super-user',
        roleType: UserRoleType.SuperUser,
        authenticationProviderId: 'nonexistant3',
      },
    ].map(
      ({ id, roleType, authenticationProviderId }) =>
        async () =>
          await db.user.upsert({
            where: {
              id,
            },
            create: {
              id,
              authenticationProviderId,
              userRoles: {
                create: {
                  roleType,
                },
              },
            },
            update: {},
          })
    ),
    { concurrency: 1 }
  )

  await db.organization.upsert({
    where: {
      id: 'seeded-organization',
    },
    create: {
      id: 'seeded-organization',
      name: 'seeded-organization',
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
