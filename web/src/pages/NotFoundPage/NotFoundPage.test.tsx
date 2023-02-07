import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import NotFoundPage from './NotFoundPage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(NotFoundPage.name, () => {
  it(`renders successfully`, () => {
    expect(() => {
      render(<NotFoundPage {...mockProps()} />)
    }).not.toThrow()
  })
})
