import { Center } from '@mantine/core'
import { FC } from 'react'

const IsolatedLayout: FC = ({ children }) => {
  return <Center style={{ height: '80vh', width: '100%' }}>{children}</Center>
}

export default IsolatedLayout
