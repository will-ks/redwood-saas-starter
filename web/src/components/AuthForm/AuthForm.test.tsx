import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import AuthForm from './AuthForm'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(AuthForm.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthForm {...mockProps()} />)
    }).not.toThrow()
  })
})
