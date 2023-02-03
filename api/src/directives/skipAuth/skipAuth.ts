// eslint-disable-next-line import/no-extraneous-dependencies
import { createValidatorDirective } from '@redwoodjs/graphql-server'
// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag'

export const schema = gql`
  """
  Use to skip authentication checks and allow public access.
  """
  directive @skipAuth on FIELD_DEFINITION
`

const skipAuth = createValidatorDirective(schema, () => {
  return
})

export default skipAuth
