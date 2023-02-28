export const schema = gql`
  type UserRole {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    roleType: String!
    user: User!
    userId: String!
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
