import type { ComponentStory } from '@storybook/react'
import { mockProps } from './ProfileMenu.test'
import ProfileMenu from './ProfileMenu'

export const generated: ComponentStory<typeof ProfileMenu> = (args) => {
  return <ProfileMenu {...mockProps(args)} />
}

export default {
  title: 'Components/' + ProfileMenu.name,
  component: ProfileMenu,
}
