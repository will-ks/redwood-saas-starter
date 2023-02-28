import { AuthContextPayload } from '@redwoodjs/api'
import { GetCurrentUser } from '@redwoodjs/graphql-server/dist/functions/types'
import { AuthenticationProviderName } from 'src/lib/models'

/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`. Note could be null.
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the return object only once you've decided they are safe to be seen
 * if someone were to open the Web Inspector in their browser.
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 *
 * @returns RedwoodUser
 */

export type AssertedCurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>

export const getAuthenticationProviderId = (
  authenticationProviderName: AuthenticationProviderName,
  idFromProvider: string
) => `${authenticationProviderName}:${idFromProvider}`

export const getCurrentUser = async (
  decoded: Parameters<GetCurrentUser>[0]
) => {
  type SupertokensDecodedJwt = {
    exp: number
    sub: string
    iss: string
    iat: number
  }
  const isSupertokensDecodedJwt = (
    toCheck: AuthContextPayload[0]
  ): toCheck is SupertokensDecodedJwt =>
    !!toCheck &&
    typeof toCheck['exp'] === 'number' &&
    typeof toCheck['sub'] === 'string' &&
    typeof toCheck['iss'] === 'string' &&
    typeof toCheck['iat'] === 'number'

  if (!isSupertokensDecodedJwt(decoded)) {
    throw new Error('Unexpected decoded JWT structure')
  }
  const { sub } = decoded
  const supertokensProviderId = getAuthenticationProviderId(
    AuthenticationProviderName.Supertokens,
    sub
  )

  return {
    supertokensProviderId,
  }
}
