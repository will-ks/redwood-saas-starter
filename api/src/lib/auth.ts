import { AuthContextPayload } from '@redwoodjs/api'
import { AuthenticationError } from '@redwoodjs/graphql-server'

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

type SupabaseDecoded = {
  aud: string
  exp: number
  sub?: string
  email: string
  phone: string
  app_metadata: { provider: 'email'; providers: ['email'] }
  user_metadata: Record<string, never>
  role: 'authenticated'
  session_id: string
}

export const getCurrentUser = async (
  decoded: AuthContextPayload[0],
  raw: AuthContextPayload[1],
  req?: AuthContextPayload[2]
) => {
  const { sub, email } = decoded as SupabaseDecoded
  if (typeof sub !== 'string' || raw.type !== 'supabase') {
    throw new Error(`Unexpected arguments, got ${decoded}, ${raw}`)
  }

  return {
    id: sub,
    email,
  }
}

export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

type AuthOptions = {
  expectedUserId?: string
}
// Don't rename - redwood validators use this
export const requireAuth = (options?: AuthOptions) => {
  getRequiredCurrentUser(options)
}

export const getRequiredCurrentUser = (
  options?: AuthOptions
): AssertedCurrentUser => {
  if (!isAuthenticated()) {
    throw new AuthenticationError(
      "You don't have permission to do that. Error: notAuthenticated."
    )
  }
  const { currentUser } = context
  if (!currentUser) {
    throw new Error('Expected currentUser')
  }
  if (!currentUser.id) {
    throw new Error('Got invalid currentUser')
  }
  if (options?.expectedUserId && currentUser.id !== options.expectedUserId) {
    throw new AuthenticationError(
      "You don't have permission to do that. Error: user ID does not match."
    )
  }
  return currentUser
}
