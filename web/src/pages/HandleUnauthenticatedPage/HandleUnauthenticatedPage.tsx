import { Center, Loader } from '@mantine/core'
import { Redirect, routes } from '@redwoodjs/router'
import { FC, useEffect } from 'react'
import { useAuth } from 'src/auth'

const HandleUnauthenticatedPage: FC = () => {
  const { logIn, isAuthenticated, loading } = useAuth()
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      logIn()
    }
  }, [isAuthenticated, logIn, loading])
  if (isAuthenticated) {
    return <Redirect to={routes.home()} />
  }
  return (
    <Center style={{ height: '80vh', width: '100%' }}>
      <Loader size="lg" />
    </Center>
  )
}

export default HandleUnauthenticatedPage
