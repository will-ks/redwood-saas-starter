import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'
import { AuthPageMode } from 'src/pages/AuthPage/AuthPage'

import AuthForm from './AuthForm'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  mode: AuthPageMode.Login,
  loginPageRoute: 'auth/login',
  forgotPasswordPageRoute: 'auth/forgot-password',
})

describe(AuthForm.name, () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthForm {...mockProps()} />)
    }).not.toThrow()
  })
})
