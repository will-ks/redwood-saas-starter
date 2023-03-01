import { removeNulls } from '@redwoodjs/api'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const organizationMemberships: QueryResolvers['organizationMemberships'] =
  () => {
    return db.organizationMembership.findMany()
  }

export const organizationMembership: QueryResolvers['organizationMembership'] =
  ({ id }) => {
    return db.organizationMembership.findUnique({
      where: { id },
    })
  }

export const createOrganizationMembership: MutationResolvers['createOrganizationMembership'] =
  ({ input }) => {
    return db.organizationMembership.create({
      data: input,
    })
  }

export const updateOrganizationMembership: MutationResolvers['updateOrganizationMembership'] =
  ({ id, input }) => {
    return db.organizationMembership.update({
      data: removeNulls(input),
      where: { id },
    })
  }

export const deleteOrganizationMembership: MutationResolvers['deleteOrganizationMembership'] =
  ({ id }) => {
    return db.organizationMembership.delete({
      where: { id },
    })
  }
