import type { ComponentStory } from '@storybook/react'
import Link from './Link'
import { mockProps } from './Link.test'

export const generated: ComponentStory<typeof Link> = (args) => {
  return <Link {...mockProps(args)} />
}

export default {
  title: 'Components/' + Link.name,
  component: Link,
}
