// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

/*
 * Instance of the Prisma Client
 */
export const db = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error'],
})
