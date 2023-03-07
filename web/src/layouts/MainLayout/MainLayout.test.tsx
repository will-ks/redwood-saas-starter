import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import MainLayout from './MainLayout'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(MainLayout.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainLayout {...mockProps()}/>)
    }).not.toThrow()
  })
})
