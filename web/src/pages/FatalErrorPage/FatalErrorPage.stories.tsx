import type { ComponentStory } from '@storybook/react'
import FatalErrorPage from './FatalErrorPage'
import { mockProps } from './FatalErrorPage.test'

export const generated: ComponentStory<typeof FatalErrorPage> = (args) => {
  return <FatalErrorPage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + FatalErrorPage.name,
  component: FatalErrorPage,
}
