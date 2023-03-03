import { assertAndReturn } from '@will-ks/helpers'
import { useAuth } from 'src/auth'

export default function useAssertedCurrentUser() {
  const { currentUser } = useAuth()
  return assertAndReturn(currentUser, 'currentUser')
}
