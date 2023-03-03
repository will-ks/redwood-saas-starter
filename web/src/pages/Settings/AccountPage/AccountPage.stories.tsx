import type { ComponentStory } from '@storybook/react'
import AccountPage from './AccountPage'
import { mockProps } from './AccountPage.test'

export const generated: ComponentStory<typeof AccountPage> = (args) => {
  return <AccountPage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + AccountPage.name,
  component: AccountPage,
}
