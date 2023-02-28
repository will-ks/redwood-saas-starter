import assert from 'assert'
import { getAuthenticationProviderId } from 'src/lib/auth'
import apiConfig from 'src/lib/config'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { AuthenticationProviderName, UserRoleType } from 'src/lib/models'
import * as Session from 'supertokens-node/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword'
import type { TypeInput } from 'supertokens-node/types'

const jwksIssuerUrl = {}

export const config: TypeInput = {
  framework: 'awsLambda',
  isInServerlessEnv: true,
  appInfo: {
    appName: apiConfig.constants.app.name,
    websiteDomain: apiConfig.constants.app.web.domain,
    apiDomain: apiConfig.constants.app.web.domain,
    apiGatewayPath: '/.redwood/functions',
    websiteBasePath: '/auth',
    apiBasePath: '/auth',
  },
  supertokens: {
    connectionURI: apiConfig.secrets.supertokens.connectionURI,
    apiKey: apiConfig.secrets.supertokens.apiKey,
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        // Google({
        //   clientId: process.env.SUPERTOKENS_GOOGLE_CLIENT_ID,
        //   clientSecret: process.env.SUPERTOKENS_GOOGLE_CLIENT_SECRET,
        // }),
        // Github({
        //   clientId: process.env.SUPERTOKENS_GITHUB_CLIENT_ID,
        //   clientSecret: process.env.SUPERTOKENS_GITHUB_CLIENT_SECRET,
        // }),
        // Apple({
        //   clientId: process.env.SUPERTOKENS_APPLE_CLIENT_ID,
        //   clientSecret: {
        //     keyId: process.env.SUPERTOKENS_APPLE_SECRET_KEY_ID,
        //     privateKey: process.env.SUPERTOKENS_APPLE_SECRET_PRIVATE_KEY,
        //     teamId: process.env.SUPERTOKENS_APPLE_SECRET_TEAM_ID,
        //   },
        // }),
      ],
      override: {
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            emailPasswordSignUpPOST: async function (input) {
              assert(originalImplementation.emailPasswordSignUpPOST)
              const response =
                await originalImplementation.emailPasswordSignUpPOST(input)
              if (response.status === 'OK') {
                const authenticationProviderId = getAuthenticationProviderId(
                  AuthenticationProviderName.Supertokens,
                  response.user.id
                )
                logger.info(
                  `Creating new user with authenticationProviderId ${authenticationProviderId}`
                )
                await db.user.create({
                  data: {
                    authenticationProviderId,
                    userRoles: {
                      create: {
                        roleType: UserRoleType.Standard,
                      },
                    },
                  },
                })
              }
              return response
            },
          }
        },
      },
    }),
    Session.init({
      jwt: { enable: true, ...jwksIssuerUrl },
    }),
  ],
}
