import { MetaTags } from '@redwoodjs/web'
import { FC, useEffect } from 'react'
import { useAuth } from 'src/auth'

const HandleUnauthenticatedPage: FC = () => {
  const { logIn, isAuthenticated, loading } = useAuth()
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      logIn()
    }
  }, [isAuthenticated, logIn, loading])
  return (
    <>
      <MetaTags title="Loading" description="Loading page" />

      <h1>LoadingPage</h1>
      <p>
        Find me in <code>./web/src/pages/LoadingPage/LoadingPage.tsx</code>.
      </p>
    </>
  )
}

export default HandleUnauthenticatedPage
