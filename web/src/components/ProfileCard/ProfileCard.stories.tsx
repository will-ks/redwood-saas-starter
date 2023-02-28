import type { ComponentStory } from '@storybook/react'
import { mockProps } from './ProfileCard.test'
import ProfileCard from './ProfileCard'

export const generated: ComponentStory<typeof ProfileCard> = (args) => {
  return <ProfileCard {...mockProps(args)} />
}

export default {
  title: 'Components/' + ProfileCard.name,
  component: ProfileCard,
}
