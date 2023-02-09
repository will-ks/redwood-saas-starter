import apiConfig from 'src/lib/config'
import * as Session from 'supertokens-node/recipe/session'
import type { TypeInput } from 'supertokens-node/types'

const jwksIssuerUrl = {}

export const config: TypeInput = {
  framework: 'awsLambda',
  isInServerlessEnv: true,
  appInfo: {
    appName: apiConfig.constants.app.name,
    apiDomain: apiConfig.constants.app.api.domain,
    websiteDomain: apiConfig.constants.app.web.domain,
    apiGatewayPath: '/.redwood/functions',
    websiteBasePath: '/auth',
    apiBasePath: '/auth',
  },
  supertokens: {
    connectionURI: apiConfig.secrets.supertokens.connectionURI,
    apiKey: apiConfig.secrets.supertokens.apiKey,
  },
  recipeList: [
    // ThirdPartyEmailPassword.init({
    //   providers: [
    //     Google({
    //       clientId: process.env.SUPERTOKENS_GOOGLE_CLIENT_ID,
    //       clientSecret: process.env.SUPERTOKENS_GOOGLE_CLIENT_SECRET,
    //     }),
    //     Github({
    //       clientId: process.env.SUPERTOKENS_GITHUB_CLIENT_ID,
    //       clientSecret: process.env.SUPERTOKENS_GITHUB_CLIENT_SECRET,
    //     }),
    //     Apple({
    //       clientId: process.env.SUPERTOKENS_APPLE_CLIENT_ID,
    //       clientSecret: {
    //         keyId: process.env.SUPERTOKENS_APPLE_SECRET_KEY_ID,
    //         privateKey: process.env.SUPERTOKENS_APPLE_SECRET_PRIVATE_KEY,
    //         teamId: process.env.SUPERTOKENS_APPLE_SECRET_TEAM_ID,
    //       },
    //     }),
    //   ],
    // }),
    Session.init({
      jwt: { enable: true, ...jwksIssuerUrl },
    }),
  ],
}
