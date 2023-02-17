import { createAuth } from '@redwoodjs/auth-supertokens-web'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { FC } from 'react'
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import Session from 'supertokens-auth-react/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import config from './data/config'

const superTokensClient = {
  sessionRecipe: Session,
  redirectToAuth: SuperTokens.redirectToAuth,
}

isBrowser &&
  SuperTokens.init({
    appInfo: {
      appName: config.app.name,
      apiDomain: config.app.web.domain,
      websiteDomain: config.app.web.domain,
      websiteBasePath: '/auth',
      apiBasePath: '/auth',
      apiGatewayPath: '/.redwood/functions',
    },
    recipeList: [
      Session.init(),
      ThirdPartyEmailPassword.init({
        signInAndUpFeature: {
          providers: [
            // Github.init(), Google.init(), Apple.init()
          ],
        },
      }),
    ],
  })

const { AuthProvider: SuperTokensAuthProvider, useAuth } =
  createAuth(superTokensClient)

const AuthProvider: FC = ({ children }) => {
  return (
    <SuperTokensWrapper>
      <SuperTokensAuthProvider>{children}</SuperTokensAuthProvider>
    </SuperTokensWrapper>
  )
}

export { AuthProvider, useAuth }
