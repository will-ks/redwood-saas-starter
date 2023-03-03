export const schema = gql`
  type OrganizationRole {
    id: UUID!
    createdAt: DateTime!
    updatedAt: DateTime!
    roleType: OrganizationRoleType!
    organizationMembership: OrganizationMembership!
    organizationMembershipId: UUID!
  }

  type Query {
    organizationRoles: [OrganizationRole!]! @requireAuth
    organizationRole(id: SafeString!): OrganizationRole @requireAuth
  }

  input CreateOrganizationRoleInput {
    roleType: OrganizationRoleType!
    organizationMembershipId: UUID!
  }

  input UpdateOrganizationRoleInput {
    roleType: OrganizationRoleType
    organizationMembershipId: UUID
  }

  type Mutation {
    createOrganizationRole(
      input: CreateOrganizationRoleInput!
    ): OrganizationRole! @requireAuth
    updateOrganizationRole(
      id: UUID!
      input: UpdateOrganizationRoleInput!
    ): OrganizationRole! @requireAuth
    deleteOrganizationRole(id: UUID!): OrganizationRole! @requireAuth
  }
`
