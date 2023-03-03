import type { ComponentStory } from '@storybook/react'
import { mockProps } from './ChangeUsername.test'
import ChangeUsername from './ChangeUsername'

export const generated: ComponentStory<typeof ChangeUsername> = (args) => {
  return <ChangeUsername {...mockProps(args)} />
}

export default {
  title: 'Components/' + ChangeUsername.name,
  component: ChangeUsername,
}
