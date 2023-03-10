import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import AccountPage from './AccountPage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(AccountPage.name, () => {
  it('throws if rendered without a currentUser', () => {
    expect(() => {
      render(<AccountPage {...mockProps()} />)
    }).toThrow()
  })
  it('renders successfully', () => {
    mockCurrentUser({
      userId: 'example',
      roles: [],
    })
    expect(() => {
      render(<AccountPage {...mockProps()} />)
    }).not.toThrow()
  })
})
