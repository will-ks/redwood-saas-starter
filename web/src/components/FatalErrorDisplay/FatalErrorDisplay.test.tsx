import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import FatalErrorDisplay, { FatalErrorType } from './FatalErrorDisplay'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  type: FatalErrorType.NotFound,
})

describe(FatalErrorDisplay.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FatalErrorDisplay {...mockProps()} />)
    }).not.toThrow()
  })
})
