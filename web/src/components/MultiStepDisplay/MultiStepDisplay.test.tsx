import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import MultiStepDisplay from './MultiStepDisplay'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  steps: [
    {
      label: 'Example',
      id: 'example',
      description: 'A step',
    },
    {
      label: 'Example 2',
      id: 'example2',
      description: 'A step',
    },
    {
      label: 'Example 3',
      id: 'example3',
      description: 'A step',
      allowStepSelect: false,
    },
  ],
  activeStepIndex: 0,
  onStepClick: () => {},
})

describe(MultiStepDisplay.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MultiStepDisplay {...mockProps()} />)
    }).not.toThrow()
  })
})
