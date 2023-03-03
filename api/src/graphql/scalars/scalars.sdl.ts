export const schema = gql`
  scalar SafeString
  scalar UUID

  enum UserRoleType {
    user
    superuser
  }

  enum OrganizationRoleType {
    admin
    member
  }
`
