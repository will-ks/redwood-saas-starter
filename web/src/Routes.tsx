// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Route, Router } from '@redwoodjs/router'
import SuperTokens from 'supertokens-auth-react'

import { useAuth } from './auth'

const Routes = () => {
  if (SuperTokens.canHandleRoute()) {
    return SuperTokens.getRoutingComponent()
  }

  return (
    <Router useAuth={useAuth}>
      {/*<Route path="/auth/{mode}" page={AuthPage} name="auth" /> // Note: This page is currently overwritten by Supertoken's route handling*/}
      {/*Note: NotFoundPage is always prerendered*/}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
