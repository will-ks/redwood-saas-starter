import type { ComponentStory } from '@storybook/react'
import HomePage from './HomePage'
import { mockProps } from './HomePage.test'

export const generated: ComponentStory<typeof HomePage> = (args) => {
  return <HomePage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + HomePage.name,
  component: HomePage,
}
