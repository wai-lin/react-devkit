import {
  Children,
  ClipboardEvent,
  createContext,
  Dispatch,
  FC,
  FormEvent,
  HTMLAttributes,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface IOtpInputContext {
  value: string
  currentFocus: number
  onInput: (e: FormEvent<HTMLInputElement>, idx: number) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>, idx: number) => void
  onFocus: (idx: number) => void
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void
}
const OtpInputContext = createContext<IOtpInputContext | null>(null)

interface IOtpGroupProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  acceptSpaceKey?: boolean
  validator?: (value: string) => boolean
}
const OtpGroup: FC<HTMLAttributes<HTMLDivElement> & IOtpGroupProps> = ({
  value,
  setValue,
  acceptSpaceKey = false,
  validator,
  children,
  ...props
}) => {
  const [currentFocus, setCurrentFocus] = useState(0)
  // merge input values
  const mergeInputValues = (newValueChunk: string, idx: number) => {
    // reject space key if not accepted
    if (!acceptSpaceKey && newValueChunk === ' ') return
    // validate new chunk value
    let validated = true
    if (validator) validated = validator(newValueChunk)
    // change new chunk value
    if (validated)
      setValue(currentValue => {
        const currentValues = currentValue.split('')
        currentValues[idx] = newValueChunk
        const newValue = currentValues.join('')
        return newValue
      })
  }
  // determine the current focus input
  const focusInput = (action: 'left' | 'right') => {
    const totalChildrenCount = Children.count(children)
    if (action === 'left') {
      if (currentFocus === 0) return // is first input
      setCurrentFocus(value => value - 1)
    }
    if (action === 'right') {
      if (currentFocus === totalChildrenCount - 1) return // is last input
      setCurrentFocus(value => value + 1)
    }
  }
  // set current focus value on focus with child index
  const onFocus = (idx: number) => {
    setCurrentFocus(idx)
  }
  // save input value and focus to next input
  const onInput = (e: FormEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault()
    const target = e.target as any
    // reject space key if not accepted
    if (!acceptSpaceKey && target.value === ' ') {
      target.value = ''
      return
    }
    // validate new input value
    validator && validator(target.value as string)
    mergeInputValues(target.value as string, idx)
    focusInput('right') // focus next input
  }
  // arrow right and left, backspace actions
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    switch (e.key) {
      case 'ArrowRight': {
        // move right input on right arrow pressed
        e.preventDefault()
        focusInput('right')
        break
      }
      case 'ArrowLeft': {
        // move left input on left arrow pressed
        e.preventDefault()
        focusInput('left')
        break
      }
      case 'Backspace': {
        // remove current input value and select previous input
        e.preventDefault()
        const target = e.target as any
        target.value = ''
        mergeInputValues('', idx)
        focusInput('left')
        break
      }
      case 'Delete': {
        // remove current input value and select previous input
        e.preventDefault()
        const target = e.target as any
        target.value = ''
        mergeInputValues('', idx)
        focusInput('left')
        break
      }
      default:
        break
    }
  }
  // handle inputs and value on paste
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const totalChildrenCount = Children.count(children)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, totalChildrenCount)
      .split('')
    let newFocusIdx = currentFocus
    pastedData.forEach((val, pasteIdx) => {
      // validate for each pasted character
      validator && validator(val)
      newFocusIdx += pasteIdx > 0 ? 1 : 0
      mergeInputValues(val, newFocusIdx)
    })
  }
  return (
    <div data-ui-otp-group {...props}>
      <OtpInputContext.Provider
        value={{ value, currentFocus, onFocus, onKeyDown, onInput, onPaste }}
      >
        {children}
      </OtpInputContext.Provider>
    </div>
  )
}

interface IStaticComponents {
  Group: typeof OtpGroup
}
interface IOtpInputProps {
  index: number
  disabled?: boolean
  type?: 'text' | 'number' | 'password'
}
const OtpInput: FC<HTMLAttributes<HTMLInputElement> & IOtpInputProps> &
  IStaticComponents = ({
  index = 0,
  disabled = false,
  type = 'text',
  ...props
}) => {
  const context = useContext(OtpInputContext)
  const inputEl = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (index === context?.currentFocus) {
      if (inputEl.current) {
        inputEl.current?.focus()
        inputEl.current?.select()
      }
    }
  }, [index, context?.currentFocus])
  return (
    <input
      ref={inputEl}
      data-ui-otp-input
      type={type}
      disabled={disabled}
      value={context?.value[index] || ''}
      maxLength={1}
      pattern="[0-9]"
      min="0"
      max="9"
      onInput={e => context?.onInput(e, index)}
      onKeyDown={e => context?.onKeyDown(e, index)}
      onFocus={() => context?.onFocus(index)}
      onPaste={e => context?.onPaste(e)}
      {...props}
    />
  )
}
OtpInput.Group = OtpGroup

export { OtpInput }
