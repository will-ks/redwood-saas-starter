import { Button, Card, Stack, Text, Title } from '@mantine/core'
import { closeAllModals } from '@mantine/modals'
import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { FC } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import ChangeUsernameCell from 'src/components/Forms/ChangeUsername/ChangeUsernameCell'
import Link from 'src/components/Link/Link'
import { openModal } from 'src/lib/overlays'
import useAssertedCurrentUser from 'src/lib/useAssertedCurrentUser'

export const UPDATE_USER = gql`
  mutation UpdateUser($id: UUID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
    }
  }
`

const AccountPage: FC = () => {
  const { userId } = useAssertedCurrentUser()
  return (
    <>
      <MetaTags title="AccountSettings" description="AccountSettings page" />
      <Button
        leftIcon={<FiArrowLeft />}
        variant={'subtle'}
        component={Link}
        to={routes.settingsMenu()}
      >
        Back to settings
      </Button>
      <Stack>
        <Title order={1}>Account</Title>
        <Card withBorder>
          <Stack align="flex-start">
            <Text weight={500} c="danger">
              Change username
            </Text>
            <Text size="sm" color="dimmed">
              Your username is how your account is known publicly. You can
              change it if you need to.
            </Text>
            <Button
              variant={'filled'}
              onClick={() =>
                openModal({
                  modalId: 'foo',
                  title: 'Change username',
                  children: (
                    <ChangeUsernameCell
                      id={userId}
                      onSuccess={() => closeAllModals()}
                    />
                  ),
                })
              }
            >
              Change username
            </Button>
          </Stack>
        </Card>
        {/*<Card withBorder>*/}
        {/*  <Stack align="flex-start">*/}
        {/*    <Text weight={500} c="danger">*/}
        {/*      Password*/}
        {/*    </Text>*/}
        {/*    <Text size="sm" color="dimmed">*/}
        {/*      To change your password, you can request a password change link*/}
        {/*      that will be delivered to your email.*/}
        {/*    </Text>*/}
        {/*    <Button variant={'filled'} onClick={() => {}}>*/}
        {/*      Request password change link*/}
        {/*    </Button>*/}
        {/*  </Stack>*/}
        {/*</Card>*/}
      </Stack>
    </>
  )
}

export default AccountPage
