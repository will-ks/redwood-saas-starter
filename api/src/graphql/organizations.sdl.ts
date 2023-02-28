export const schema = gql`
  type Organization {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    memberships: [OrganizationMembership]!
  }

  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: String!): Organization @requireAuth
  }

  input CreateOrganizationInput {
    name: String!
  }

  input UpdateOrganizationInput {
    name: String
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    updateOrganization(
      id: String!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: String!): Organization! @requireAuth
  }
`
