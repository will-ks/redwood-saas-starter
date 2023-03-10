// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Route, Router, Set } from '@redwoodjs/router'
import IsolatedLayout from 'src/layouts/IsolatedLayout/IsolatedLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import SuperTokens from 'supertokens-auth-react'

import { useAuth } from './auth'

const Routes = () => {
  if (SuperTokens.canHandleRoute()) {
    return SuperTokens.getRoutingComponent()
  }

  return (
    <Router useAuth={useAuth}>
      <Set wrap={[IsolatedLayout]}>
        <Route path="/check-auth" page={HandleUnauthenticatedPage} name="check-auth" />
      </Set>
      <Set wrap={[MainLayout]}>
        <Route path="/home" page={HomePage} name="home" />
        {/*Note: Auth route is currently overwritten by Supertoken's route handling*!/*/}
        <Route path="/auth/{mode}" page={AuthPage} name="auth" />
        <Private unauthenticated={'check-auth'}>
          <Route path="/settings/account" page={SettingsAccountPage} name="settingsAccount" />
          <Route path="/settings" page={SettingsMenuPage} name="settingsMenu" />
          <Route path="/profile/{id:String}" page={ProfilePage} name="profile" />
        </Private>
      </Set>
      {/*Note: NotFoundPage is always prerendered, and ignores Sets*/}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
