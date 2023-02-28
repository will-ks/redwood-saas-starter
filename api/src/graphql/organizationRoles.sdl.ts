export const schema = gql`
  type OrganizationRole {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    roleType: String!
    organizationMembership: OrganizationMembership!
    organizationMembershipId: String!
  }

  type Query {
    organizationRoles: [OrganizationRole!]! @requireAuth
    organizationRole(id: String!): OrganizationRole @requireAuth
  }

  input CreateOrganizationRoleInput {
    roleType: String!
    organizationMembershipId: String!
  }

  input UpdateOrganizationRoleInput {
    roleType: String
    organizationMembershipId: String
  }

  type Mutation {
    createOrganizationRole(
      input: CreateOrganizationRoleInput!
    ): OrganizationRole! @requireAuth
    updateOrganizationRole(
      id: String!
      input: UpdateOrganizationRoleInput!
    ): OrganizationRole! @requireAuth
    deleteOrganizationRole(id: String!): OrganizationRole! @requireAuth
  }
`
