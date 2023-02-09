import type { ComponentStory } from '@storybook/react'
import ProfilePage from './ProfilePage'
import { mockProps } from './ProfilePage.test'

export const generated: ComponentStory<typeof ProfilePage> = (args) => {
  return <ProfilePage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + ProfilePage.name,
  component: ProfilePage,
}
