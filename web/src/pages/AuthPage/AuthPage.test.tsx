import { render } from '@redwoodjs/testing/web'
import { getPropsMocker } from 'src/lib/mock-helpers'

import AuthPage, { AuthPageMode } from './AuthPage'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  mode: AuthPageMode.SignUp,
})

Object.values(AuthPageMode).forEach((mode) => {
  describe(AuthPage.name, () => {
    it(`renders successfully ${mode}`, () => {
      expect(() => {
        render(<AuthPage {...mockProps()} mode={mode as AuthPageMode} />)
      }).not.toThrow()
    })
  })
})
