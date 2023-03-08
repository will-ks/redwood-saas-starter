import { Avatar, Menu, NavLink, useMantineTheme } from '@mantine/core'
import { navigate, routes } from '@redwoodjs/router'
import { FC, ReactElement } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { useMedia } from 'react-use'
import { useAuth } from 'src/auth'
import { openModal } from 'src/lib/overlays'

const ProfileMenu: FC<{
  avatarSrc?: string
  name?: string
}> = ({ avatarSrc, name }) => {
  const { logOut } = useAuth()
  const theme = useMantineTheme()
  const isLargeScreen = useMedia(`(min-width: ${theme.breakpoints.sm}px)`)
  const menuItems: { icon: ReactElement; name: string; onClick: () => void }[] =
    [
      {
        icon: <FiSettings />,
        name: 'Settings',
        onClick: () => navigate(routes.settingsMenu()),
      },
      {
        icon: <FiLogOut />,
        name: 'Log out',
        onClick: () => logOut(),
      },
    ]

  return isLargeScreen ? (
    <Menu shadow="md" width={200} position={'top-end'}>
      <Menu.Target>
        <Avatar src={avatarSrc}>{name?.[0]}</Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        {menuItems.map((item) => (
          <Menu.Item icon={item.icon} onClick={item.onClick} key={item.name}>
            {item.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  ) : (
    <button
      onClick={() =>
        openModal({
          fullScreen: true,
          title: 'Menu',
          transition: 'pop',
          children: (
            <>
              {menuItems.map((item) => (
                <NavLink
                  icon={item.icon}
                  onClick={item.onClick}
                  label={item.name}
                  key={item.name}
                />
              ))}
            </>
          ),
        })
      }
    >
      <Avatar src={avatarSrc}>{name?.[0]}</Avatar>
    </button>
  )
}

export default ProfileMenu
