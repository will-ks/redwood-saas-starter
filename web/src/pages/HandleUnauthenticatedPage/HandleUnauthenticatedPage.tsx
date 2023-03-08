import { Loader } from '@mantine/core'
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
  return <Loader size="lg" />
}

export default HandleUnauthenticatedPage
