import { Container, Paper, Text, Title } from '@mantine/core'
import { routes } from '@redwoodjs/router'
import { getEnumTypeGuard } from '@will-ks/helpers'
import { FC } from 'react'
import AuthForm from 'src/components/AuthForm/AuthForm'
import Link from 'src/components/Link/Link'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'

export enum AuthPageMode {
  SignUp = 'signup',
  Login = 'login',
  ForgotPassword = 'forgot-password',
  ChangePassword = 'change-password',
}

const isAuthPageMode = getEnumTypeGuard(AuthPageMode)

// Note: This page is currently not used since the Supertokens auth implementation uses its own UI.
// TODO: Use this page once the Supertokens implementation supports custom UI.

const AuthPage: FC<{
  mode: string
}> = ({ mode: modeParam }) => {
  if (!isAuthPageMode(modeParam)) {
    return <NotFoundPage />
  }
  const mode = modeParam as AuthPageMode
  return (
    <Container size={420} my={40}>
      <Title align="center">
        {(() => {
          switch (mode) {
            case AuthPageMode.Login:
              return 'Welcome back!'
            case AuthPageMode.SignUp:
              return 'Create an account'
            case AuthPageMode.ForgotPassword:
              return 'Forgot your password?'
            case AuthPageMode.ChangePassword:
              return 'Change password'
          }
        })()}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {(() => {
          switch (mode) {
            case AuthPageMode.Login:
              return (
                <>
                  {"Don't have an account yet? "}
                  <Link
                    to={routes.auth({ mode: AuthPageMode.SignUp })}
                    size="sm"
                  >
                    Create account
                  </Link>
                </>
              )
            case AuthPageMode.SignUp:
              return (
                <>
                  {'Already have an account? '}
                  <Link
                    to={routes.auth({ mode: AuthPageMode.Login })}
                    size="sm"
                  >
                    Sign in
                  </Link>
                </>
              )
            case AuthPageMode.ForgotPassword:
              return 'Enter your email to get a reset link'
            case AuthPageMode.ChangePassword:
              return 'Choose a new password for your account'
          }
        })()}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <AuthForm
          mode={mode}
          loginPageRoute={routes.auth({ mode: AuthPageMode.Login })}
          forgotPasswordPageRoute={routes.auth({
            mode: AuthPageMode.ForgotPassword,
          })}
        />
      </Paper>
    </Container>
  )
}

export default AuthPage
