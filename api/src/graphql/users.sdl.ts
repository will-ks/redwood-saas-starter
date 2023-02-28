export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userRoles: [UserRole]!
    organizationMembership: [OrganizationMembership]!
    authenticationProviderType: String!
    authenticationProviderId: String!
    username: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    authenticationProviderType: String!
    authenticationProviderId: String!
    username: String
  }

  input UpdateUserInput {
    authenticationProviderType: String
    authenticationProviderId: String
    username: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
