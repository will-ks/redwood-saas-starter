import { useController, UseControllerProps } from '@redwoodjs/forms'
import { cloneElement, FC, ReactElement } from 'react'

// Used to wrap elements for use with Redwood Form.
// To be useful, the wrapped element should have, at a minimum, an "onChange"
// and a "value" prop.
const RedwoodFormFieldWrapper: FC<
  UseControllerProps & {
    children: ReactElement
    onChangePropName?: string
    valuePropName?: string
    errorPropName?: string
    namePropName?: string
  }
> = ({
  name,
  rules,
  defaultValue,
  children,
  onChangePropName = 'onChange',
  valuePropName = 'value',
  errorPropName = 'error',
  namePropName = 'name',
}) => {
  const {
    field: { onChange: controlledOnChange, name: controlledName, value },
    fieldState: { error: controlledError },
  } = useController({
    name,
    rules,
    defaultValue,
  })
  return cloneElement(children, {
    [onChangePropName]: controlledOnChange,
    [valuePropName]: value,
    [errorPropName]: controlledError,
    [namePropName]: controlledName,
  })
}

export default RedwoodFormFieldWrapper
