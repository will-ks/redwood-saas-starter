import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import MenuPage from './MenuPage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(MenuPage.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuPage {...mockProps()} />)
    }).not.toThrow()
  })
})
