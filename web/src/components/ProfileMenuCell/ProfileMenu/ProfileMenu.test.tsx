import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import ProfileMenu from './ProfileMenu'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
})

describe(ProfileMenu.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileMenu {...mockProps()} />)
    }).not.toThrow()
  })
})
