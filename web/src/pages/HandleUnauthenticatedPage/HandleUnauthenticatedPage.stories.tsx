import type { ComponentStory } from '@storybook/react'
import HandleUnauthenticatedPage from './HandleUnauthenticatedPage'
import { mockProps } from './HandleUnauthenticatedPage.test'

export const generated: ComponentStory<typeof HandleUnauthenticatedPage> = (
  args
) => {
  return <HandleUnauthenticatedPage {...mockProps(args)} />
}

export default {
  title: 'Pages/' + HandleUnauthenticatedPage.name,
  component: HandleUnauthenticatedPage,
}
