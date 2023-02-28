import { removeNulls } from '@redwoodjs/api'
import type {
  QueryResolvers,
  MutationResolvers,
  OrganizationRoleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const organizationRoles: QueryResolvers['organizationRoles'] = () => {
  return db.organizationRole.findMany()
}

export const organizationRole: QueryResolvers['organizationRole'] = ({
  id,
}) => {
  return db.organizationRole.findUnique({
    where: { id },
  })
}

export const createOrganizationRole: MutationResolvers['createOrganizationRole'] =
  ({ input }) => {
    return db.organizationRole.create({
      data: input,
    })
  }

export const updateOrganizationRole: MutationResolvers['updateOrganizationRole'] =
  ({ id, input }) => {
    return db.organizationRole.update({
      data: removeNulls(input),
      where: { id },
    })
  }

export const deleteOrganizationRole: MutationResolvers['deleteOrganizationRole'] =
  ({ id }) => {
    return db.organizationRole.delete({
      where: { id },
    })
  }

export const OrganizationRole: OrganizationRoleRelationResolvers = {
  organizationMembership: (_obj, { root }) => {
    return db.organizationRole
      .findUniqueOrThrow({ where: { id: root?.id } })
      .organizationMembership()
  },
}
