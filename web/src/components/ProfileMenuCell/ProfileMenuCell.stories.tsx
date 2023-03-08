import { ComponentStory } from '@storybook/react'
import { Empty, Failure, Loading, Success } from './ProfileMenuCell'
import { mockProps } from './ProfileMenuCell.test'

export const loading: ComponentStory<typeof Loading> = () => {
  return Loading ? <Loading /> : <></>
}

export const empty: ComponentStory<typeof Empty> = () => {
  return Empty ? <Empty /> : <></>
}

export const failure: ComponentStory<typeof Failure> = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : <></>
}

export const success: ComponentStory<typeof Success> = () => {
  return Success ? <Success {...mockProps()} /> : <></>
}

export default { title: 'Cells/ProfileMenuCell' }
