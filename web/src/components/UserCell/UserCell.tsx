import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { FC } from 'react'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import type { UserQuery, UserQueryVariables } from 'types/graphql'

export const QUERY = gql`
  query UserQuery($id: SafeString!) {
    user: user(id: $id) {
      username
    }
  }
`

export const Loading: FC = () => <div>Loading...</div>

export const Empty: FC = () => <div>Empty</div>

export const Failure: FC<CellFailureProps<UserQueryVariables>> = ({
  error,
}) => <div style={{ color: 'red' }}>Error: {error?.message}</div>

export const Success: FC<CellSuccessProps<UserQuery, UserQueryVariables>> = ({
  user: { username },
}) => {
  return <ProfileCard name={username ?? 'User'} />
}
