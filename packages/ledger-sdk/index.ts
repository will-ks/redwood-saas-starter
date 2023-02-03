import pipeNow from '@arrows/composition/pipeNow'
import { ApiError, getApiClient } from '@will-ks/helpers'
import { AssetName, COMPANY_ACCOUNT_NAME, LEDGER_NAME } from 'shared-data/src'

type TransferPosting = {
  fromAccountId: string
  toAccountId: string
  tokensQuantity: number
}

export enum LedgerErrorCode {
  InsufficientFunds = 'INSUFFICIENT_FUND',
  Validation = 'VALIDATION',
}

type LedgerErrorResponse = {
  data: {
    error_code: LedgerErrorCode | string
    error_message: string
  }
}

const isLedgerErrorResponse = (
  toCheck: unknown
): toCheck is LedgerErrorResponse => {
  return !!(toCheck as LedgerErrorResponse)?.data?.error_code
}

export class LedgerApiError extends ApiError {
  apiError: ApiError
  name = 'LedgerApiError'
  errorCode?: LedgerErrorCode | string
  errorMessage?: string

  constructor(error: ApiError) {
    super(error.axiosError)
    this.apiError = error
    const { response } = error.axiosError
    this.errorCode = isLedgerErrorResponse(response)
      ? response.data.error_code
      : undefined
    this.errorMessage = isLedgerErrorResponse(response)
      ? response.data.error_message
      : undefined
  }
}

export class LedgerApiInsufficientBalanceError extends LedgerApiError {
  errorCode = LedgerErrorCode.InsufficientFunds
  name = 'LedgerApiInsufficientBalanceError'

  constructor(error: ApiError) {
    super(error)
  }
}

export const ledger = pipeNow(
  getApiClient({
    apiName: `Ledger ${LEDGER_NAME}`,
    config: {
      baseURL: 'http://127.0.0.1:3068',
    },
    logger: console,
    transformError: (apiError) => {
      const ledgerError = new LedgerApiError(apiError)
      return ledgerError.errorCode === LedgerErrorCode.InsufficientFunds
        ? new LedgerApiInsufficientBalanceError(apiError)
        : ledgerError
    },
  }),
  (client) =>
    class {
      private static getUserLedgerAccountId(userId: string) {
        return `user:${userId.replaceAll('-', '_')}`
      }
      private static async getAccount({ accountId }: { accountId: string }) {
        return client.get<{
          data: {
            address: string
            volumes: {
              [assetName: string]: {
                input: number
                output: number
                balance: number
              }
            }
            balances: {
              [assetName: string]: number
            }
          }
        }>(`${LEDGER_NAME}/accounts/${accountId}`)
      }
      private static async makeTransaction({
        postings,
      }: {
        postings: {
          amount: number | string
          asset: AssetName
          destination: string
          source: string
        }[]
      }) {
        return (
          await client.post<{
            data: {
              txid: number
              preCommitVolumes: {
                [accountName: string]: {
                  [assetName: string]: {
                    input: number
                    output: number
                    balance: number
                  }
                }
              }
              postCommitVolumes: {
                [accountName: string]: {
                  [assetName: string]: {
                    input: number
                    output: number
                    balance: number
                  }
                }
              }
              timestamp: string
            }[]
          }>(`${LEDGER_NAME}/transactions`, {
            postings,
          })
        ).data.data[0]
      }
      private static async getTokenBalance({
        accountId,
      }: {
        accountId: string
      }): Promise<number> {
        return (
          (await this.getAccount({ accountId })).data.data.balances[
            AssetName.Token
          ] ?? 0
        )
      }
      private static async transferTokens(postings: TransferPosting[]) {
        const transaction = await this.makeTransaction({
          postings: [
            ...postings.map(
              ({ fromAccountId, toAccountId, tokensQuantity }) => {
                return {
                  amount: tokensQuantity,
                  asset: AssetName.Token,
                  destination: toAccountId,
                  source: fromAccountId,
                }
              }
            ),
          ],
        })
        return {
          transactionId: String(transaction.txid),
        }
      }

      static async getCompanyUsdBalance() {
        return (
          (
            await this.getAccount({
              accountId: COMPANY_ACCOUNT_NAME,
            })
          ).data.data.balances[AssetName.Usd] ?? 0
        )
      }

      static async getUserTokenBalance({ userId }: { userId: string }) {
        return this.getTokenBalance({
          accountId: this.getUserLedgerAccountId(userId),
        })
      }

      static async purchaseTokens({
        userId,
        priceUsd,
        tokensQuantity,
      }: {
        userId: string
        priceUsd: number
        tokensQuantity: number
      }) {
        const transaction = await this.makeTransaction({
          postings: [
            {
              amount: priceUsd,
              asset: AssetName.Usd,
              destination: this.getUserLedgerAccountId(userId),
              source: 'world',
            },
            {
              amount: priceUsd,
              asset: AssetName.Usd,
              destination: COMPANY_ACCOUNT_NAME,
              source: this.getUserLedgerAccountId(userId),
            },
            {
              amount: tokensQuantity,
              asset: AssetName.Token,
              destination: COMPANY_ACCOUNT_NAME,
              source: 'world',
            },
            {
              amount: tokensQuantity,
              asset: AssetName.Token,
              destination: this.getUserLedgerAccountId(userId),
              source: COMPANY_ACCOUNT_NAME,
            },
          ],
        })
        return {
          transactionId: String(transaction.txid),
        }
      }
      static async transferTokensBetweenUsers({
        fromUserId,
        toUserId,
        tokensQuantity,
      }: {
        fromUserId: string
        toUserId: string
        tokensQuantity: number
      }) {
        return this.transferTokens([
          {
            fromAccountId: this.getUserLedgerAccountId(fromUserId),
            toAccountId: this.getUserLedgerAccountId(toUserId),
            tokensQuantity,
          },
        ])
      }
    }
)
