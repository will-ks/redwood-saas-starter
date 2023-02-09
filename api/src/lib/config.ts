import { assertAndReturn } from '@will-ks/helpers'

const apiConfig = {
  secrets: {
    example: {
      key: assertAndReturn(process.env.EXAMPLE_KEY, 'process.env.EXAMPLE_KEY'),
    },
    supertokens: {
      connectionURI: assertAndReturn(
        process.env.SUPERTOKENS_CONNECTION_URI,
        'process.env.SUPERTOKENS_CONNECTION_URI'
      ),
      apiKey: assertAndReturn(
        process.env.SUPERTOKENS_API_KEY,
        'process.env.SUPERTOKENS_API_KEY'
      ),
      jwksUrl: assertAndReturn(
        process.env.SUPERTOKENS_JWKS_URL, // Note: Don't remove, this is used internally by Redwood
        'process.env.SUPERTOKENS_JWKS_URL'
      ),
    },
  },
  constants: {
    example: {
      name: assertAndReturn(
        process.env.EXAMPLE_NAME,
        'process.env.EXAMPLE_NAME'
      ),
    },
    app: {
      name: assertAndReturn(process.env.REDWOOD_ENV_APP_NAME),
      web: {
        domain: assertAndReturn(
          process.env.REDWOOD_ENV_WEB_DOMAIN,
          'process.env.REDWOOD_ENV_WEB_DOMAIN'
        ),
      },
    },
  },
}

export default apiConfig
