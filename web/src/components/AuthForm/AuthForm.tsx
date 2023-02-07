import {
  Box,
  Button,
  Center,
  Checkbox,
  createStyles,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { Form } from '@redwoodjs/forms'
import { FC } from 'react'
import Link from 'src/components/Link/Link'
import RedwoodFormFieldWrapper from 'src/components/RedwoodFormFieldWrapper/RedwoodFormFieldWrapper'
import { AuthPageMode } from 'src/pages/AuthPage/AuthPage'

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}))

const AuthForm: FC<{
  mode: AuthPageMode
  loginPageRoute: string
  forgotPasswordPageRoute: string
}> = ({ mode, loginPageRoute, forgotPasswordPageRoute }) => {
  const { classes } = useStyles()
  return (
    <Form onSubmit={(values) => console.log(values)}>
      <Stack>
        {mode !== AuthPageMode.ChangePassword && (
          <RedwoodFormFieldWrapper
            name={'email'}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              maxLength: {
                value: 254,
                message: 'This seems too long, please check it',
              },
              validate: {
                email: (value) =>
                  (value && /.+@\S+\.\S+$/.test(value.trim())) ||
                  "This doesn't look like a valid email, please check it",
              },
            }}
            defaultValue={''}
            requiredPropName={null}
          >
            <TextInput label="Email" placeholder="you@example.com" />
          </RedwoodFormFieldWrapper>
        )}
        {mode === AuthPageMode.ForgotPassword ? (
          <>
            <Group position="apart" className={classes.controls}>
              <Link
                to={loginPageRoute}
                color="dimmed"
                size="sm"
                className={classes.control}
              >
                <Center inline>
                  {'< '}
                  <Box ml={5}>Back to login page</Box>
                </Center>
              </Link>
              <Button className={classes.control} type={'submit'}>
                Reset password
              </Button>
            </Group>
          </>
        ) : (
          <>
            <RedwoodFormFieldWrapper
              name={'password'}
              defaultValue={''}
              rules={{
                required: 'Password is required',
                validate: {
                  // ...
                  length: (value) =>
                    (value && value.length > 8) ||
                    'Should be at least 8 characters long',
                  digits: (value) =>
                    (value && /\d/.test(value)) || 'Should contain a number',
                  lowercase: (value) =>
                    (value && /[a-z]/.test(value)) ||
                    'Should contain a lowercase character',
                  uppercase: (value) =>
                    (value && /[A-Z]/.test(value)) ||
                    'Should contain an uppercase character',
                  // ...
                },
              }}
              requiredPropName={null}
            >
              <PasswordInput
                label="Password"
                placeholder="Your password"
                description={
                  mode === AuthPageMode.SignUp &&
                  'Password must be at least 8 characters long, include at least one lowercase and one uppercase letter, one number and one special character'
                }
              />
            </RedwoodFormFieldWrapper>

            {mode !== AuthPageMode.ChangePassword && (
              <Group position="apart">
                <RedwoodFormFieldWrapper
                  name={'remember'}
                  defaultValue={false}
                  valuePropName={'checked'}
                >
                  <Checkbox label="Remember me" />
                </RedwoodFormFieldWrapper>
                {mode === AuthPageMode.Login && (
                  <Link to={forgotPasswordPageRoute} size="sm">
                    Forgot password?
                  </Link>
                )}
              </Group>
            )}
            <Button fullWidth type={'submit'}>
              {mode === AuthPageMode.Login
                ? 'Sign in'
                : mode === AuthPageMode.SignUp
                ? 'Create account'
                : 'Change password'}
            </Button>
          </>
        )}
      </Stack>
    </Form>
  )
}

export default AuthForm
