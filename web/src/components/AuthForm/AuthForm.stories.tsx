import type { ComponentStory } from '@storybook/react'
import { mockProps } from './AuthForm.test'
import AuthForm from './AuthForm'

export const generated: ComponentStory<typeof AuthForm> = (args) => {
  return <AuthForm {...mockProps(args)} />
}

export default {
  title: 'Components/' + AuthForm.name,
  component: AuthForm,
}
