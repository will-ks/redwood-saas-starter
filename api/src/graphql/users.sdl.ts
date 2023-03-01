export const schema = gql`
  type User {
    id: String!
    createdAt: DateTime! @ownerOrSuperuserOnly(userIdKey: "id")
    updatedAt: DateTime! @ownerOrSuperuserOnly(userIdKey: "id")
    userRoles: [UserRole]! @ownerOrSuperuserOnly(userIdKey: "id")
    organizationMembership: [OrganizationMembership]!
      @ownerOrSuperuserOnly(userIdKey: "id")
    authenticationProviderId: String! @ownerOrSuperuserOnly(userIdKey: "id")
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
    updateUser(id: String!, input: UpdateUserInput!): User!
      @requireAuth
      @ownerOrSuperuserOnly(userIdKey: "id", objectFetcherName: "user")
    deleteUser(id: String!): User!
      @requireAuth
      @ownerOrSuperuserOnly(userIdKey: "id", objectFetcherName: "user")
  }
`
