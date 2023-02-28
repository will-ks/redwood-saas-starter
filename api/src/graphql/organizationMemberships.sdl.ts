export const schema = gql`
  type OrganizationMembership {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: String!
    organization: Organization!
    organizationId: String!
    organizationRoles: [OrganizationRole]!
  }

  type Query {
    organizationMemberships: [OrganizationMembership!]! @requireAuth
    organizationMembership(id: String!): OrganizationMembership @requireAuth
  }

  input CreateOrganizationMembershipInput {
    userId: String!
    organizationId: String!
  }

  input UpdateOrganizationMembershipInput {
    userId: String
    organizationId: String
  }

  type Mutation {
    createOrganizationMembership(
      input: CreateOrganizationMembershipInput!
    ): OrganizationMembership! @requireAuth
    updateOrganizationMembership(
      id: String!
      input: UpdateOrganizationMembershipInput!
    ): OrganizationMembership! @requireAuth
    deleteOrganizationMembership(id: String!): OrganizationMembership!
      @requireAuth
  }
`
