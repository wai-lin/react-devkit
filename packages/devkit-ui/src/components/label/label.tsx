import { FormControl } from 'components/form-control/form-control'
import { FC, HTMLAttributes, useContext } from 'react'

interface ILabelProps {
  htmlFor?: string
}
const Label: FC<HTMLAttributes<HTMLLabelElement> & ILabelProps> = ({
  htmlFor = '',
  ...props
}) => {
  const context = useContext(FormControl.Context)
  return <label htmlFor={context.id || htmlFor} {...props} />
}

export { Label }
