import { ApplicationFailure } from '@temporalio/client'
import { ledger, LedgerApiError } from 'ledger-sdk'

const convertErrorToApplicationFailure = (error: unknown) => {
  const errorCode =
    error instanceof LedgerApiError ? error.errorCode : 'UNKNOWN'
  throw new ApplicationFailure(errorCode, errorCode)
}

export const transferTokensBetweenUsers = (
  ...args: Parameters<typeof ledger.transferTokensBetweenUsers>
) =>
  ledger
    .transferTokensBetweenUsers(args[0])
    .catch(convertErrorToApplicationFailure)
