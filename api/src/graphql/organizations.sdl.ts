export const schema = gql`
  type Organization {
    id: UUID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    memberships: [OrganizationMembership]!
  }

  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: SafeString!): Organization @requireAuth
  }

  input CreateOrganizationInput {
    name: SafeString!
  }

  input UpdateOrganizationInput {
    name: SafeString
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    updateOrganization(
      id: UUID!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: UUID!): Organization! @requireAuth
  }
`
