import type { ComponentStory } from '@storybook/react'
import MenuPage from './MenuPage'
import { mockProps } from './MenuPage.test'

export const generated: ComponentStory<typeof MenuPage> = (args) => {
  return <MenuPage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + MenuPage.name,
  component: MenuPage,
}
