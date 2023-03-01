import { getCurrentUser } from 'src/lib/auth'

// getCurrentUser

// 1. Throws by default
// 2. Throws with unexpected argument
// 3. Returns with correct argument
describe('getCurrentUser', () => {
  it('throws by default', () => {
    expect(getCurrentUser({})).rejects.toThrow()
  })

  it('throws with unexpected decoded format', () => {
    expect(
      getCurrentUser({
        something: 'something',
        somethingElse: 123,
      })
    ).rejects.toThrow()
  })

  it('resolves when decoded matches SuperTokens format', () => {
    expect(
      getCurrentUser({
        exp: 123,
        sub: 'aaa',
        iss: 'aaa',
        iat: 123,
        appUserId: 'appUserId',
        roles: ['someRole'],
      })
    ).resolves.toEqual({
      userId: 'appUserId',
      roles: ['someRole'],
    })
  })
})
