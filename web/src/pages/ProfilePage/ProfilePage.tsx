import { FC } from 'react'
import UserCell from '../../components/UserCell'

const ProfilePage: FC<{ id: string }> = ({ id }) => {
  return (
    <>
      <UserCell id={id} />
    </>
  )
}

export default ProfilePage
