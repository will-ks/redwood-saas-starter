import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import HomePage from './HomePage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(HomePage.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage {...mockProps()}  />)
    }).not.toThrow()
  })
})
