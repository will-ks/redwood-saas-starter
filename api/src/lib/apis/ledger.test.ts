import execa from 'execa'
import { ledger, LedgerApiInsufficientBalanceError } from 'ledger-sdk'

const stopTestDependencies = () =>
  execa('yarn', ['workspace', 'ledger', 'stop:test'])
const startTestDependencies = () =>
  execa('yarn', ['workspace', 'ledger', 'start:test'])

const userId = 'newuser'
const user2Id = 'seconduser'

const performAndCheckUserTokenPurchase = async ({
  tokensQuantity,
  priceUsd,
}: {
  tokensQuantity: number
  priceUsd: number
}) => {
  await expect(ledger.getUserTokenBalance({ userId })).resolves.toBe(0)
  await expect(ledger.getCompanyUsdBalance()).resolves.toBe(0)
  await expect(
    ledger.purchaseTokens({
      priceUsd,
      tokensQuantity,
      userId,
    })
  ).resolves.toBeTruthy()
  await expect(ledger.getUserTokenBalance({ userId })).resolves.toBe(
    tokensQuantity
  )
  await expect(ledger.getCompanyUsdBalance()).resolves.toBe(priceUsd)
}

describe.skip('ledger', () => {
  jest.setTimeout(20_000)

  beforeEach(async () => {
    await stopTestDependencies()
    await startTestDependencies()
  })
  afterAll(async () => {
    await stopTestDependencies()
  })

  test('Balances start at 0. Purchasing tokens results in expected balance change.', async () => {
    await performAndCheckUserTokenPurchase({ tokensQuantity: 10, priceUsd: 10 })
  })

  test('User to user transfer succeeds with appropriate balance', async () => {
    const { tokensQuantity, priceUsd } = { tokensQuantity: 10, priceUsd: 10 }
    await performAndCheckUserTokenPurchase({ tokensQuantity, priceUsd })
    await expect(
      ledger.transferTokensBetweenUsers({
        fromUserId: userId,
        toUserId: user2Id,
        tokensQuantity,
      })
    ).resolves.toBeTruthy()
    await expect(ledger.getUserTokenBalance({ userId })).resolves.toBe(0)
    await expect(ledger.getUserTokenBalance({ userId: user2Id })).resolves.toBe(
      tokensQuantity
    )
  })

  test('User to user transfer errors with insufficient balance, and no tokens transferred', async () => {
    const { tokensQuantity, priceUsd } = { tokensQuantity: 10, priceUsd: 10 }
    await performAndCheckUserTokenPurchase({ tokensQuantity, priceUsd })
    await expect(
      ledger.transferTokensBetweenUsers({
        fromUserId: userId,
        toUserId: user2Id,
        tokensQuantity: tokensQuantity + 1,
      })
    ).rejects.toThrow(LedgerApiInsufficientBalanceError)
    await expect(ledger.getUserTokenBalance({ userId })).resolves.toBe(
      tokensQuantity
    )
    await expect(ledger.getUserTokenBalance({ userId: user2Id })).resolves.toBe(
      0
    )
  })
})
