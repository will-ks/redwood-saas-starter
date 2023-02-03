import pipeNow from '@arrows/composition/pipeNow'
import { getApiClient } from '@will-ks/helpers'
import axios, { AxiosError } from 'axios'
import { AssetName, COMPANY_ACCOUNT_NAME, LEDGER_NAME } from 'shared-data/src'

export type TransferPosting = {
  fromAccountId: string
  toAccountId: string
  tokensQuantity: number
}

export enum LedgerErrorCode {
  InsufficientFunds = 'INSUFFICIENT_FUND',
  Validation = 'VALIDATION',
}

export interface ILedgerError {
  response: {
    data: {
      error_code: LedgerErrorCode | string
      error_message: string
    }
  }
}

const isLedgerServerError = (toCheck: unknown): toCheck is ILedgerError => {
  return axios.isAxiosError(toCheck) && !!toCheck.response?.data?.error_code
}

export class LedgerApiError extends Error {
  axiosError: AxiosError
  name = 'LedgerError'
  isServerProvidedError?: boolean
  isNetworkError?: boolean
  isServerError?: boolean
  statusCode?: number
  errorCode?: LedgerErrorCode | string
  errorMessage?: string

  constructor(error: AxiosError) {
    super()
    this.axiosError = error
    const { response, request, stack, config } = error

    this.isServerProvidedError = response && true // client received an error response (5xx, 4xx)
    this.isNetworkError = request && !response // client never received a response, or request never left
    this.stack = stack
    this.statusCode = response?.status
    this.isServerError = this.statusCode ? this.statusCode >= 500 : undefined
    this.errorCode = isLedgerServerError(error)
      ? error.response.data.error_code
      : undefined
    this.errorMessage = isLedgerServerError(error)
      ? error.response.data.error_message
      : undefined
    this.message = `${response?.status || 'Network error'} at ${
      config?.url ?? 'unknown url'
    } ${JSON.stringify(this.errorCode ?? this.axiosError)}`
  }
}

export class LedgerApiInsufficientBalanceError extends LedgerApiError {
  errorCode = LedgerErrorCode.InsufficientFunds

  constructor(error: AxiosError) {
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
    transformError: (axiosError) => {
      const ledgerError = new LedgerApiError(axiosError)
      return ledgerError.errorCode === LedgerErrorCode.InsufficientFunds
        ? new LedgerApiInsufficientBalanceError(axiosError)
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
