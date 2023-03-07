import type { ComponentStory } from '@storybook/react'
import { mockProps } from './MainLayout.test'
import MainLayout from './MainLayout'

export const generated: ComponentStory<typeof MainLayout> = (args) => {
  return <MainLayout {...mockProps(args)} />
}

export default {
  title: 'Layouts/' + MainLayout.name,
  component: MainLayout,
}
