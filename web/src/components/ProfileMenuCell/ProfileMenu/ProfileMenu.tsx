import { Avatar, Menu } from '@mantine/core'
import { navigate, routes } from '@redwoodjs/router'
import { FC } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { useAuth } from 'src/auth'

const ProfileMenu: FC<{
  avatarSrc?: string
  name?: string
}> = ({ avatarSrc, name }) => {
  const { logOut } = useAuth()
  return (
    <Menu shadow="md" width={200} position={'top-end'}>
      <Menu.Target>
        <Avatar src={avatarSrc}>{name?.[0]}</Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<FiSettings />}
          onClick={() => navigate(routes.settingsMenu())}
        >
          Settings
        </Menu.Item>
        <Menu.Item icon={<FiLogOut />} onClick={() => logOut()}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu
