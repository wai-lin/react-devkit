import { FC, HTMLAttributes, InputHTMLAttributes, useContext } from 'react'
import { FormControl } from '../form-control/form-control'
import { Label } from '../label/label'

// CheckboxInput
const CheckboxInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  id = '',
  ...props
}) => {
  const context = useContext(FormControl.Context)
  return <input type="checkbox" id={context.id || id} {...props} />
}

// Checkbox
interface IStaticComponents {
  Label: typeof Label
  Input: typeof CheckboxInput
}
const Checkbox: FC<HTMLAttributes<HTMLDivElement>> & IStaticComponents = ({
  children,
  ...props
}) => {
  return (
    <div data-ui-form-control-checkbox {...props}>
      <FormControl>{children}</FormControl>
    </div>
  )
}
Checkbox.Label = Label
Checkbox.Input = CheckboxInput

export { Checkbox }
