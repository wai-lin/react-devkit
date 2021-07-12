import { FC, HTMLAttributes, useContext } from 'react'
import { FormControl } from '../form-control/form-control'
import { Label } from '../label/label'

interface IInputTextFieldProps {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'date'
    | 'time'
    | 'submit'
  required?: boolean
  autoComplete?: string
}
const InputTextField: FC<HTMLAttributes<HTMLInputElement> &
  IInputTextFieldProps> = ({
  id = '',
  type = 'text',
  required = false,
  autoComplete = '',
  ...props
}) => {
  const context = useContext(FormControl.Context)
  return (
    <input
      data-ui-input-text-field
      id={context.id || id}
      type={type}
      required={required}
      autoComplete={autoComplete}
      {...props}
    />
  )
}

const InputTextarea: FC<HTMLAttributes<HTMLTextAreaElement>> = ({
  id = '',
  ...props
}) => {
  const context = useContext(FormControl.Context)
  return <textarea id={context.id || id} {...props} />
}

interface IStaticComponents {
  Label: typeof Label
  TextField: typeof InputTextField
  Textarea: typeof InputTextarea
}
const Input: FC<HTMLAttributes<HTMLDivElement>> & IStaticComponents = ({
  children,
  ...props
}) => {
  return (
    <div data-ui-form-control-input {...props}>
      <FormControl>{children}</FormControl>
    </div>
  )
}
Input.Label = Label
Input.TextField = InputTextField
Input.Textarea = InputTextarea

export { Input }
