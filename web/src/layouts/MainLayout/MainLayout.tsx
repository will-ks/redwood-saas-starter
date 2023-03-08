import {
  AppShell,
  Button,
  Footer,
  Group,
  Header,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { FC } from 'react'
import { useAuth } from 'src/auth'
import ProfileMenuCell from 'src/components/ProfileMenuCell'

const MainLayout: FC = ({ children }) => {
  const theme = useMantineTheme()
  const { loading, isAuthenticated, currentUser } = useAuth()
  return (
    <AppShell
      padding={'lg'}
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[1]
              : theme.colors.gray[0],
        },
      }}
      footer={
        <Footer height={60} p="md">
          <div style={{ maxWidth: theme.breakpoints.md, margin: 'auto' }}>
            Application footer
          </div>
        </Footer>
      }
      header={
        <Header height={{ base: 70, md: 70 }} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              maxWidth: theme.breakpoints.md,
              margin: 'auto',
              width: '100%',
            }}
          >
            <Group position="apart" style={{ width: '100%' }}>
              <Text>Application header</Text>
              {!loading && (
                <Group position="left">
                  {currentUser ? (
                    <ProfileMenuCell id={currentUser.userId} />
                  ) : (
                    <Button variant="subtle">Log In</Button>
                  )}
                </Group>
              )}
            </Group>
          </div>
        </Header>
      }
    >
      <div style={{ maxWidth: theme.breakpoints.md, margin: 'auto' }}>
        {children}
      </div>
    </AppShell>
  )
}

export default MainLayout
