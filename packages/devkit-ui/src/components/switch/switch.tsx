import {
  ChangeEventHandler,
  createContext,
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

const SwitchContext = createContext<{ state: 'on' | 'off' }>({ state: 'off' })

// SwitchToggle
interface ISwitchToggleProps {
  focusStyle?: string
  isRect?: boolean
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}
const SwitchToggle: FC<InputHTMLAttributes<HTMLInputElement> &
  ISwitchToggleProps> = ({
  id = '',
  className,
  isRect = false,
  checked = false,
  onChange,
  'aria-label': ariaLabel = 'Toggle',
  focusStyle = '',
  children,
  ...props
}) => {
  const context = useContext(FormControl.Context)
  const [switchId, setSwitchId] = useState('')
  const [focusState, setFocusState] = useState<'focus' | 'blur'>('blur')
  const [switchState, setSwitchState] = useState<'on' | 'off'>('off')

  useEffect(() => {
    setSwitchState(checked ? 'on' : 'off')
  }, [checked])

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
        className={clsx(
          className,
          focusState === 'focus' ? focusStyle : '',
          isRect ? 'rect' : '',
        )}
        {...props}
      >
        <SwitchContext.Provider value={{ state: switchState }}>
          {children}
        </SwitchContext.Provider>
      </span>
    </label>
  )
}

const SwitchOn: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { state } = useContext(SwitchContext)
  return state === 'on' ? (
    <div data-ui-switch-on {...props}>
      {children}
    </div>
  ) : null
}

const SwitchOff: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { state } = useContext(SwitchContext)
  return state === 'off' ? (
    <div data-ui-switch-off {...props}>
      {children}
    </div>
  ) : null
}

// Switch
interface IStaticComponents {
  Label: typeof Label
  Toggle: typeof SwitchToggle
  On: typeof SwitchOn
  Off: typeof SwitchOff
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
Switch.On = SwitchOn
Switch.Off = SwitchOff

export { Switch }
