import { createValidatorDirective } from '@redwoodjs/graphql-server'
import gql from 'graphql-tag'

import { requireAuth as applicationRequireAuth } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated and is associated
  with an optional set of roles.
  """
  directive @requireAuth(roles: [String]) on FIELD_DEFINITION
`

const requireAuth = createValidatorDirective(schema, ({ directiveArgs }) => {
  applicationRequireAuth()
})

export default requireAuth
