import type { ComponentStory } from '@storybook/react'
import { mockProps } from './IsolatedLayout.test'
import IsolatedLayout from './IsolatedLayout'

export const generated: ComponentStory<typeof IsolatedLayout> = (args) => {
  return <IsolatedLayout {...mockProps(args)} />
}

export default {
  title: 'Layouts/' + IsolatedLayout.name,
  component: IsolatedLayout,
}
