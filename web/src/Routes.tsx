// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Route, Router, Set } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import SuperTokens from 'supertokens-auth-react'

import { useAuth } from './auth'

const Routes = () => {
  if (SuperTokens.canHandleRoute()) {
    return SuperTokens.getRoutingComponent()
  }

  return (
    <Router useAuth={useAuth}>
      <Set wrap={[MainLayout]}>
        <Route path="/check-auth" page={HandleUnauthenticatedPage} name="check-auth" />
        {/*Note: Auth route is currently overwritten by Supertoken's route handling*!/*/}
        <Route path="/auth/{mode}" page={AuthPage} name="auth" />
        {/*Note: NotFoundPage is always prerendered*/}
        <Route notfound page={NotFoundPage} />
        <Private unauthenticated={'check-auth'}>
          <Route path="/settings/account" page={SettingsAccountPage} name="settingsAccount" />
          <Route path="/settings" page={SettingsMenuPage} name="settingsMenu" />
          <Route path="/profile/{id:String}" page={ProfilePage} name="profile" />
        </Private>
      </Set>
    </Router>
  )
}

export default Routes
