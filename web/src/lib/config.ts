import { assertAndReturn } from '@will-ks/helpers'

const webConfig = {
  // Note: You cannot destructure process.env
  // NOTE: Every env variable used here is expected to be prefixed with REDWOOD_ENV,
  // which makes it available to the frontend (and thus public! no private keys here)
  example: assertAndReturn(
    process.env.REDWOOD_ENV_EXAMPLE,
    'process.env.REDWOOD_ENV_EXAMPLE'
  ),
  app: {
    name: assertAndReturn(process.env.REDWOOD_ENV_APP_NAME),
    web: {
      domain: assertAndReturn(
        process.env.REDWOOD_ENV_WEB_DOMAIN,
        'process.env.REDWOOD_ENV_WEB_DOMAIN'
      ),
    },
    api: {
      domain: assertAndReturn(
        process.env.REDWOOD_ENV_API_DOMAIN,
        'process.env.REDWOOD_ENV_API_DOMAIN'
      ),
    },
  },
}

export default webConfig
