import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { FC } from 'react'
import ProfileMenu from 'src/components/ProfileMenuCell/ProfileMenu/ProfileMenu'
import { ProfileMenuQuery, ProfileMenuQueryVariables } from 'types/graphql'

export const QUERY = gql`
  query ProfileMenuQuery($id: SafeString!) {
    user: user(id: $id) {
      username
    }
  }
`

export const Loading: FC = () => <ProfileMenu />

export const Empty: FC = () => <Failure />

export const Failure: FC<CellFailureProps<ProfileMenuQueryVariables>> = ({
  error,
}) => <div style={{ color: 'red' }}>Error: {error?.message}</div>

export const Success: FC<
  CellSuccessProps<ProfileMenuQuery, ProfileMenuQueryVariables>
> = ({ user: { username } }) => {
  return <ProfileMenu name={username ?? undefined} />
}
