import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import IsolatedLayout from './IsolatedLayout'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(IsolatedLayout.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IsolatedLayout {...mockProps()}/>)
    }).not.toThrow()
  })
})
