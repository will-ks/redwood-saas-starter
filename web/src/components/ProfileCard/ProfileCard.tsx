import { Avatar, Button, Group, Paper, Text } from '@mantine/core'
import { FC } from 'react'

const ProfileCard: FC<{
  avatarSrc?: string
  name: string
  stats?: { label: string; value: string }[]
}> = ({ avatarSrc, name, stats = [] }) => {
  return (
    <Paper radius="md" withBorder p="lg">
      <Avatar src={avatarSrc} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      {stats.length > 0 && (
        <Group mt="md" position="center" spacing={30}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <Text align="center" size="lg" weight={500}>
                {stat.value}
              </Text>
              <Text align="center" size="sm" color="dimmed">
                {stat.label}
              </Text>
            </div>
          ))}
        </Group>
      )}

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  )
}

export default ProfileCard
