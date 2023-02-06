import { useController, UseControllerProps } from '@redwoodjs/forms'
import { ChangeEvent, Children, cloneElement, FC, ReactElement } from 'react'

// Used to wrap elements for use with Redwood Form.
// To be useful, the wrapped element should have, at a minimum, "onChange",
// "value" and "error" props, which will be overwritten.
const RedwoodFormFieldWrapper: FC<
  UseControllerProps & {
    children: ReactElement
    defaultValue: string | number | boolean
    onChangePropName?: string
    valuePropName?: string
    errorPropName?: string
    namePropName?: string
    requiredPropName?: string | null
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
  requiredPropName = 'required',
}) => {
  const {
    field: { onChange: controlledOnChange, name: controlledName, value },
    fieldState: { error: controlledError },
  } = useController({
    name,
    rules,
    defaultValue,
  })
  const { [onChangePropName]: childOnChange } = Children.only(children).props
  return cloneElement(children, {
    [onChangePropName]: childOnChange
      ? (e: ChangeEvent<HTMLInputElement>) => {
          controlledOnChange(e)
          return childOnChange(e)
        }
      : controlledOnChange,
    [valuePropName]: value,
    [errorPropName]: controlledError?.message,
    [namePropName]: controlledName,
    ...(requiredPropName !== null
      ? {
          [requiredPropName]: !!rules?.required,
        }
      : {}),
  })
}

export default RedwoodFormFieldWrapper
