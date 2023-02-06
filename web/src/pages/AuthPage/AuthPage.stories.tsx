import type { ComponentStory } from '@storybook/react'
import AuthPage from './AuthPage'
import { mockProps } from './AuthPage.test'

export const generated: ComponentStory<typeof AuthPage> = (args) => {
  return <AuthPage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + AuthPage.name,
  component: AuthPage,
}
