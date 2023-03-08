import type { ComponentStory } from '@storybook/react'
import { mockProps } from './MultiStepDisplay.test'
import MultiStepDisplay from './MultiStepDisplay'

export const generated: ComponentStory<typeof MultiStepDisplay> = (args) => {
  return <MultiStepDisplay {...mockProps(args)} />
}

export default {
  title: 'Components/' + MultiStepDisplay.name,
  component: MultiStepDisplay,
}
