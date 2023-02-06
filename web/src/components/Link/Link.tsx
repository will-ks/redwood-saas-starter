import { Anchor } from '@mantine/core'
import { Link as RedwoodLink } from '@redwoodjs/router'
import { ComponentProps, FC } from 'react'

const Link: FC<ComponentProps<typeof Anchor<typeof RedwoodLink>>> = (props) => {
  return <Anchor<typeof RedwoodLink> component={RedwoodLink} {...props} />
}

export default Link
