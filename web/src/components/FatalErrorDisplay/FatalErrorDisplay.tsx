import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { FC } from 'react'
import Link from 'src/components/Link/Link'
import { isNetworkError } from 'src/lib/error-helpers'

export enum FatalErrorType {
  NotFound,
  Unknown,
  Network,
}

const FatalErrorDisplay: FC<{
  type?: FatalErrorType
  showHomeButton?: boolean
  error?: unknown
}> = ({ type: typeProp, showHomeButton = true, error }) => {
  const inferredType = isNetworkError(error)
    ? FatalErrorType.Network
    : undefined
  const type = typeProp ?? inferredType ?? FatalErrorType.Unknown
  return (
    <Container size="xs" px="xs" py="xs">
      <Text align="center" color="dimmed" size={120} weight={900}>
        {(() => {
          switch (type) {
            case FatalErrorType.NotFound:
              return '404'
            case FatalErrorType.Network:
              return 'Error'
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
              case FatalErrorType.Network:
                return 'Check your connection.'
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
              case FatalErrorType.Network:
                return "We're having trouble connecting to the network. Please check your internet connection or try again later. If the problem doesn't resolve, contact support."
              default:
                return "Sorry about that. Try again later, and if the problem doesn't resolve, contact support."
            }
          })()}
        </Text>
        {showHomeButton && (
          <Group position="center">
            <Button variant="subtle" size="md" component={Link} to={''}>
              Back to the home page
            </Button>
          </Group>
        )}
      </Stack>
    </Container>
  )
}

export default FatalErrorDisplay
