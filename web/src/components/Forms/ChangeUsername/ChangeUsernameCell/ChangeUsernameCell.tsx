import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { FC } from 'react'
import FatalErrorDisplay from 'src/components/FatalErrorDisplay/FatalErrorDisplay'
import ChangeUsername from 'src/components/Forms/ChangeUsername/ChangeUsername'
import { UPDATE_USER } from 'src/pages/Settings/AccountPage/AccountPage'
import type {
  ChangeUsernameQuery,
  ChangeUsernameQueryVariables,
} from 'types/graphql'
import { UpdateUser, UpdateUserVariables } from 'types/graphql'

export const QUERY = gql`
  query ChangeUsernameQuery($id: String!) {
    user: user(id: $id) {
      username
    }
  }
`

export const UPDATE_USERNAME = gql`
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
    }
  }
`

export const Loading: FC = () => (
  <ChangeUsername
    defaultValues={{ username: '' }}
    loading={true}
    onSubmit={() => {}}
    submitting={false}
  />
)

export const Empty: FC = () => <FatalErrorDisplay showHomeButton={false} />

export const Failure: FC<CellFailureProps<ChangeUsernameQueryVariables>> = ({
  error,
}) => <FatalErrorDisplay showHomeButton={false} error={error} />

export const Success: FC<
  CellSuccessProps<ChangeUsernameQuery, ChangeUsernameQueryVariables> & {
    id: string
    onSuccess?: () => void
  }
> = ({ user: { username }, id, onSuccess }) => {
  const [updateUser, { loading, error }] = useMutation<
    UpdateUser,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted: () => onSuccess?.(),
    refetchQueries: [QUERY],
  })

  return (
    <ChangeUsername
      defaultValues={{ username: username ?? '' }}
      loading={false}
      submitting={loading}
      onSubmit={({ username }) =>
        updateUser({ variables: { id, input: { username } } })
      }
      serverError={error}
    />
  )
}
