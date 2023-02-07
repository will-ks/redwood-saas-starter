import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { FC } from 'react'
import Link from 'src/components/Link/Link'

export enum FatalErrorType {
  NotFound,
  Unknown,
}

const FatalErrorDisplay: FC<{
  type: FatalErrorType
}> = ({ type }) => {
  return (
    <Container size="xs" px="xs" py="xs">
      <Text align="center" color="dimmed" size={220} weight={900}>
        {(() => {
          switch (type) {
            case FatalErrorType.NotFound:
              return '404'
            default:
              return 'Oops'
          }
        })()}
      </Text>
      <Stack>
        <Title align="center">
          {(() => {
            switch (type) {
              case FatalErrorType.NotFound:
                return 'Page not found.'
              default:
                return 'Something went wrong.'
            }
          })()}
        </Title>
        <Text color="dimmed" size="lg" align="center">
          {(() => {
            switch (type) {
              case FatalErrorType.NotFound:
                return 'You may have mistyped the address, or the page may have been moved to another URL.'
              default:
                return "Sorry about that. Try again later, and if the problem doesn't resolve, contact support."
            }
          })()}
        </Text>
        <Group position="center">
          <Button variant="subtle" size="md" component={Link} to={''}>
            Back to the home page
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}

export default FatalErrorDisplay
