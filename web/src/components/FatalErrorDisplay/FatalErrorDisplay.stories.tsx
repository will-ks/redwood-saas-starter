import type { ComponentStory } from '@storybook/react'
import { mockProps } from './FatalErrorDisplay.test'
import FatalErrorDisplay from './FatalErrorDisplay'

export const generated: ComponentStory<typeof FatalErrorDisplay> = (args) => {
  return <FatalErrorDisplay {...mockProps(args)} />
}

export default {
  title: 'Components/' + FatalErrorDisplay.name,
  component: FatalErrorDisplay,
}
