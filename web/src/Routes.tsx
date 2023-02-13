// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Route, Router } from '@redwoodjs/router'
import HandleUnauthenticatedPage from 'src/pages/HandleUnauthenticatedPage/HandleUnauthenticatedPage'
import SuperTokens from 'supertokens-auth-react'

import { useAuth } from './auth'

const Routes = () => {
  if (SuperTokens.canHandleRoute()) {
    return SuperTokens.getRoutingComponent()
  }

  return (
    <Router useAuth={useAuth}>
      <Route path="/check-auth" page={HandleUnauthenticatedPage} name="check-auth" />
      <Private unauthenticated={'check-auth'}>
        <Route path="/profile" page={ProfilePage} name="profile" />
      </Private>
      {/*// Note: This page is currently overwritten by Supertoken's route handling*/}
      <Route path="/auth/{mode}" page={AuthPage} name="auth" />
      {/*Note: NotFoundPage is always prerendered*/}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
