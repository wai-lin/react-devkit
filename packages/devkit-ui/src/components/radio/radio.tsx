import {
  FC,
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
  createContext,
  HTMLAttributes,
} from 'react'
import uuid from 'utils/uuid'
import { FormControl } from '../form-control/form-control'
import { Label } from '../label/label'

// RadioGroup
const initialGroupState = { groupName: '' }
const RadioGroupContext = createContext(initialGroupState)
const RadioGroup: FC = ({ children }) => {
  const [groupName, setGroupName] = useState('')
  // create group name for radio group
  useEffect(() => setGroupName('radio-gp-' + uuid()), [])
  return (
    <RadioGroupContext.Provider value={{ groupName }}>
      {children}
    </RadioGroupContext.Provider>
  )
}

// RadioInput
const RadioInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  id = '',
  name = '',
  ...props
}) => {
  const radioGroupContext = useContext(RadioGroupContext)
  const radioContext = useContext(FormControl.Context)
  return (
    <input
      type="radio"
      name={radioGroupContext.groupName || name}
      id={radioContext.id || id}
      {...props}
    />
  )
}

// Radio
interface IStaticComponents {
  Group: typeof RadioGroup
  Label: typeof Label
  Input: typeof RadioInput
}
const Radio: FC<HTMLAttributes<HTMLDivElement>> & IStaticComponents = ({
  children,
  ...props
}) => {
  return (
    <div data-ui-form-control-radio {...props}>
      <FormControl>{children}</FormControl>
    </div>
  )
}
Radio.Group = RadioGroup
Radio.Label = Label
Radio.Input = RadioInput

export { Radio }
