import { createValidatorDirective } from '@redwoodjs/graphql-server'
// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag'
import { getAssertedCurrentUser } from 'src/lib/directive-helpers'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated.
  """
  directive @requireAuth on FIELD_DEFINITION
`

const requireAuth = createValidatorDirective(schema, () => {
  getAssertedCurrentUser()
})

export default requireAuth
