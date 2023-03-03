import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import ChangeUsername from './ChangeUsername'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  submitting: false,
  defaultValues: { username: 'exampleUsername' },
})

describe(ChangeUsername.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChangeUsername {...mockProps()} />)
    }).not.toThrow()
  })
})
