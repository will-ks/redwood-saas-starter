export const schema = gql`
  type UserRole {
    id: String!
    createdAt: DateTime! @ownerOrSuperuserOnly(userIdKey: "userId")
    updatedAt: DateTime! @ownerOrSuperuserOnly(userIdKey: "userId")
    roleType: String!
    user: User! @ownerOrSuperuserOnly(userIdKey: "userId")
    userId: String! @ownerOrSuperuserOnly(userIdKey: "userId")
  }

  type Query {
    userRoles: [UserRole!]! @requireAuth
    userRole(id: String!): UserRole @requireAuth
  }

  input CreateUserRoleInput {
    roleType: String!
    userId: String!
  }

  input UpdateUserRoleInput {
    roleType: String
    userId: String
  }

  type Mutation {
    createUserRole(input: CreateUserRoleInput!): UserRole! @requireAuth
    updateUserRole(id: String!, input: UpdateUserRoleInput!): UserRole!
      @requireAuth
    deleteUserRole(id: String!): UserRole! @requireAuth
  }
`
