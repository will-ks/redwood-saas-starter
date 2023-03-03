export const schema = gql`
  type User {
    id: UUID!
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
    user(id: SafeString!): User @requireAuth
  }

  input CreateUserInput {
    authenticationProviderType: SafeString!
    authenticationProviderId: SafeString!
    username: SafeString
  }

  input UpdateUserInput {
    authenticationProviderType: SafeString
    authenticationProviderId: SafeString
    username: SafeString
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: UUID!, input: UpdateUserInput!): User!
      @requireAuth
      @ownerOrSuperuserOnly(userIdKey: "id", objectFetcherName: "user")
    deleteUser(id: UUID!): User!
      @requireAuth
      @ownerOrSuperuserOnly(userIdKey: "id", objectFetcherName: "user")
  }
`
