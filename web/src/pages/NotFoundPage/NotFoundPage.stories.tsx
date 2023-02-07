import type { ComponentStory } from '@storybook/react'
import NotFoundPage from './NotFoundPage'
import { mockProps } from './NotFoundPage.test'

export const generated: ComponentStory<typeof NotFoundPage> = (args) => {
  return <NotFoundPage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + NotFoundPage.name,
  component: NotFoundPage,
}
