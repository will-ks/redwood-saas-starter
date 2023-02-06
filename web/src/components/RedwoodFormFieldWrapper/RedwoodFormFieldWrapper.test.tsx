import {
  Checkbox,
  ColorInput,
  FileInput,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core'
import { Form } from '@redwoodjs/forms'
import { render } from '@redwoodjs/testing/web'
import { ReactElement } from 'react'
import { getPropsMocker } from 'src/lib/mock-helpers'

import RedwoodFormFieldWrapper from './RedwoodFormFieldWrapper'

export const mockProps = getPropsMocker({
  // Add props not covered by included in mock defaults here
  defaultValue: '',
})

const mantineFormElements: ReactElement[] = [
  <Radio key={0} />,
  <Checkbox key={1} />,
  <PasswordInput key={2} />,
  <ColorInput key={3} />,
  <Switch key={4} />,
  <NumberInput key={5} />,
  <Select data={['a', 'b', 'c']} key={6} />,
  <FileInput key={7} />,
  <TextInput key={8} />,
  <Textarea key={9} />,
]

mantineFormElements.forEach((element) => {
  describe(RedwoodFormFieldWrapper.name, () => {
    it('renders successfully', () => {
      expect(() => {
        render(
          <Form>
            <RedwoodFormFieldWrapper {...mockProps()}>
              {element}
            </RedwoodFormFieldWrapper>
          </Form>
        )
      }).not.toThrow()
    })
  })
})
