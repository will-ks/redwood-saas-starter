import { Button, LoadingOverlay, Stack, TextInput } from '@mantine/core'
import { Form, FormError, RWGqlError } from '@redwoodjs/forms'
import { FC } from 'react'

import RedwoodFormFieldWrapper from 'src/components/RedwoodFormFieldWrapper/RedwoodFormFieldWrapper'

type FieldValues = { username: string }

export type Props = {
  loading: boolean
  submitting: boolean
  onSubmit: (values: FieldValues) => void
  serverError?: RWGqlError
  defaultValues: FieldValues
}
const ChangeUsername: FC<Props> = ({
  loading,
  submitting,
  onSubmit,
  serverError,
  defaultValues,
}) => {
  return (
    <Form<FieldValues> onSubmit={(values) => onSubmit(values)}>
      <Stack style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} overlayBlur={1} />
        <RedwoodFormFieldWrapper
          name={'username'}
          defaultValue={defaultValues.username}
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Should be at least 3 characters long',
            },
          }}
          requiredPropName={null}
        >
          <TextInput placeholder="Username" label="Username" withAsterisk />
        </RedwoodFormFieldWrapper>
        <FormError error={serverError} />
        <Button fullWidth type={'submit'} loading={submitting}>
          Change username
        </Button>
      </Stack>
    </Form>
  )
}

export default ChangeUsername
