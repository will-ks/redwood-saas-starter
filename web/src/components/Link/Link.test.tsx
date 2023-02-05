import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import Link from './Link'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  children: 'Click me',
})

describe(Link.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Link {...mockProps()} />)
    }).not.toThrow()
  })
})
