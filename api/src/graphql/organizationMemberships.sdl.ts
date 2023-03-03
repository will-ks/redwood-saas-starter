export const schema = gql`
  type OrganizationMembership {
    id: UUID!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: UUID!
    organization: Organization!
    organizationId: UUID!
    organizationRoles: [OrganizationRole]!
  }

  type Query {
    organizationMemberships: [OrganizationMembership!]! @requireAuth
    organizationMembership(id: SafeString!): OrganizationMembership @requireAuth
  }

  input CreateOrganizationMembershipInput {
    userId: UUID!
    organizationId: UUID!
  }

  input UpdateOrganizationMembershipInput {
    userId: UUID
    organizationId: UUID
  }

  type Mutation {
    createOrganizationMembership(
      input: CreateOrganizationMembershipInput!
    ): OrganizationMembership! @requireAuth
    updateOrganizationMembership(
      id: UUID!
      input: UpdateOrganizationMembershipInput!
    ): OrganizationMembership! @requireAuth
    deleteOrganizationMembership(id: UUID!): OrganizationMembership!
      @requireAuth
  }
`
