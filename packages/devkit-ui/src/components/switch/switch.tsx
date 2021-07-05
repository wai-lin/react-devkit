import {
  ChangeEventHandler,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FormControl } from '../form-control/form-control'
import { Label } from '../label/label'
import uuid from '../../utils/uuid'
import clsx from 'clsx'

// SwitchToggle
interface ISwitchToggleProps {
  focusStyle?: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}
const SwitchToggle: FC<InputHTMLAttributes<HTMLInputElement> &
  ISwitchToggleProps> = ({
  id = '',
  className,
  checked = false,
  onChange,
  'aria-label': ariaLabel = 'Toggle',
  focusStyle = '',
  ...props
}) => {
  const context = useContext(FormControl.Context)
  const [switchId, setSwitchId] = useState('')
  const [focusState, setFocusState] = useState<'focus' | 'blur'>('blur')
  useEffect(() => {
    if (context.id === '' && id === '') setSwitchId(uuid())
    else setSwitchId(context.id || id)
  }, [context.id, id])
  // change size of the controller btn on render
  useEffect(() => {
    const switchControllerCssVarName = '--switch-controller-size'
    const switchBtn = document.getElementById(`${switchId}-btn`)
    if (switchBtn) {
      const newSize = `${switchBtn.clientHeight - 8}px`
      switchBtn.style.setProperty(switchControllerCssVarName, newSize) // set new size
    }
  }, [switchId, className])
  return (
    <label data-ui-switch-label aria-label={ariaLabel}>
      <input
        data-ui-switch-input
        id={context.id || id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onFocus={() => setFocusState('focus')}
        onBlur={() => setFocusState('blur')}
      />
      <span
        data-ui-switch-btn
        id={`${switchId}-btn`}
        className={clsx(className, focusState === 'focus' ? focusStyle : '')}
        {...props}
      />
    </label>
  )
}

// Switch
interface IStaticComponents {
  Label: typeof Label
  Toggle: typeof SwitchToggle
}
const Switch: FC<HTMLAttributes<HTMLDivElement>> & IStaticComponents = ({
  children,
  ...props
}) => {
  return (
    <div data-ui-form-control-switch {...props}>
      <FormControl>{children}</FormControl>
    </div>
  )
}
Switch.Label = Label
Switch.Toggle = SwitchToggle

export { Switch }
