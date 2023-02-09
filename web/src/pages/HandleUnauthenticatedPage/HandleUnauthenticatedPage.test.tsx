import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import HandleUnauthenticatedPage from './HandleUnauthenticatedPage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(HandleUnauthenticatedPage.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HandleUnauthenticatedPage {...mockProps()} />)
    }).not.toThrow()
  })
})
