import { NavLink, Stack, Title } from '@mantine/core'
import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { FC } from 'react'
import { FiChevronRight, FiUser } from 'react-icons/fi'
import Link from 'src/components/Link/Link'

const MenuPage: FC = () => {
  return (
    <>
      <MetaTags title="Settings" description="Settings" />
      <Stack>
        <Title order={1}>Settings</Title>
        <NavLink
          component={Link}
          to={routes.settingsAccount()}
          label="Account"
          icon={<FiUser />}
          description={'Manage your user account'}
          active
          rightSection={<FiChevronRight />}
        />
      </Stack>
    </>
  )
}

export default MenuPage
