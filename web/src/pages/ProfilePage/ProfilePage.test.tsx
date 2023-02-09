import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import ProfilePage from './ProfilePage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(ProfilePage.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilePage {...mockProps()}  />)
    }).not.toThrow()
  })
})
