import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import FatalErrorPage from './FatalErrorPage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(FatalErrorPage.name, () => {
  it(`renders successfully`, () => {
    expect(() => {
      render(<FatalErrorPage {...mockProps()} />)
    }).not.toThrow()
  })
})
