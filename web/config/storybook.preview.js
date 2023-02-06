import { MantineProvider } from '@mantine/core'
import * as theme from 'config/mantine.config'
import * as React from 'react'

// Mock Jest methods, since we import mock data from a test file
window.describe = () => {}
window.test = () => {}

/** @type { import("@storybook/csf").GlobalTypes } */
export const globalTypes = {}
/**
 * An example, no-op storybook decorator. Use a function like this to create decorators.
 * @param { import("@storybook/addons").StoryFn} StoryFn
 * @param { import("@storybook/addons").StoryContext} context
 * @returns StoryFn, unmodified.
 */
const _exampleDecorator = (StoryFn, _context) => {
  return <StoryFn />
}
const withMantine = (StoryFn) => {
  return (
    <MantineProvider theme={theme}>
      <StoryFn />
    </MantineProvider>
  )
}
export const decorators = [withMantine]
