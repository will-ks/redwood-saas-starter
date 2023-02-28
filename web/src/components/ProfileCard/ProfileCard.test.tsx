import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import ProfileCard from './ProfileCard'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  stats: [
    {
      label: 'Followers',
      value: '220',
    },
  ],
})

describe(ProfileCard.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileCard {...mockProps()} />)
    }).not.toThrow()
  })
})
