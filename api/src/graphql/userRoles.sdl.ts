export const schema = gql`
  type UserRole {
    id: UUID!
    createdAt: DateTime! @ownerOrSuperuserOnly(userIdKey: "userId")
    updatedAt: DateTime! @ownerOrSuperuserOnly(userIdKey: "userId")
    roleType: UserRoleType!
    user: User! @ownerOrSuperuserOnly(userIdKey: "userId")
    userId: UUID! @ownerOrSuperuserOnly(userIdKey: "userId")
  }

  type Query {
    userRoles: [UserRole!]! @requireAuth
    userRole(id: SafeString!): UserRole @requireAuth
  }

  input CreateUserRoleInput {
    roleType: UserRoleType!
    userId: UUID!
  }

  input UpdateUserRoleInput {
    roleType: UserRoleType
    userId: UUID
  }

  type Mutation {
    createUserRole(input: CreateUserRoleInput!): UserRole! @requireAuth
    updateUserRole(id: UUID!, input: UpdateUserRoleInput!): UserRole!
      @requireAuth
    deleteUserRole(id: UUID!): UserRole! @requireAuth
  }
`
