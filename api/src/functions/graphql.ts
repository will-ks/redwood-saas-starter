import { authDecoder } from '@redwoodjs/auth-supertokens-api'
import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import { UUIDDefinition, UUIDResolver } from 'graphql-scalars'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import {
  SafeStringResolver,
  SafeStringTypeDefinition,
} from 'src/graphql/scalars/SafeString'
import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import services from 'src/services/**/*.{js,ts}'

export const handler = createGraphQLHandler({
  authDecoder,
  getCurrentUser,
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
  schemaOptions: {
    typeDefs: [SafeStringTypeDefinition, UUIDDefinition],
    resolvers: {
      SafeString: SafeStringResolver,
      UUID: UUIDResolver,
    },
  },
})
