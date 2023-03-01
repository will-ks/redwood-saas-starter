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
    }),
    Session.init({
      jwt: { enable: true, ...jwksIssuerUrl },
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            createNewSession: async function (input) {
              const supertokensProviderId = getAuthenticationProviderId(
                AuthenticationProviderName.Supertokens,
                input.userId
              )
              logger.info(
                `Creating new session JWT token for user with authenticationProviderId ${supertokensProviderId}`
              )
              const { id, userRoles } = await db.user.upsert({
                where: {
                  authenticationProviderId: supertokensProviderId,
                },
                create: {
                  authenticationProviderId: supertokensProviderId,
                  userRoles: {
                    create: {
                      roleType: UserRoleType.Standard,
                    },
                  },
                },
                update: {},
                include: {
                  userRoles: true,
                },
              })
              const inputWithAddedClaims = {
                ...input,
                accessTokenPayload: {
                  ...input.accessTokenPayload,
                  appUserId: id,
                  roles: userRoles.map((role) => role.roleType),
                },
              }

              return originalImplementation.createNewSession(
                inputWithAddedClaims
              )
            },
          }
        },
      },
    }),
  ],
}
