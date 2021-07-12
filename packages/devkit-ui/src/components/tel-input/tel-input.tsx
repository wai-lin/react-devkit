import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  HTMLAttributes,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react'
import libPhoneNumber, { CountryCode } from 'libphonenumber-js'
import debounce from 'lodash/debounce'
import { FormControl } from '../form-control/form-control'
import { Label } from '../label/label'

interface ITelInputTextFieldProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  country: CountryCode
  format?: 'international' | 'national'
  autoComplete?: string | undefined
}
const TelInputTextField: FC<HTMLAttributes<HTMLInputElement> &
  ITelInputTextFieldProps> = ({
  id = '',
  autoComplete = 'on',
  value = '',
  setValue,
  country = 'US',
  format = 'international',
  onChange,
  ...props
}) => {
  const context = useContext(FormControl.Context)
  const inputEl = useRef<HTMLInputElement>(null)
  const formatPhoneNumber = (phone: string) =>
    debounce(() => {
      const asYouType = libPhoneNumber(phone, country)
      if (asYouType?.isValid()) {
        setValue &&
          setValue(() => {
            if (format === 'international')
              return asYouType.formatInternational()
            else if (format === 'national') return asYouType.formatNational()
            else return phone
          })
      }
    }, 500)()
  const sentValue = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)
    onChange && onChange(e)
    formatPhoneNumber(inputValue)
  }
  useEffect(() => {}, [value, setValue, country, format])
  return (
    <input
      data-ui-tel-input
      ref={inputEl}
      type="tel"
      value={value}
      id={context.id || id}
      autoComplete={autoComplete}
      onChange={sentValue}
      {...props}
    />
  )
}

interface IStaticComponents {
  Label: typeof Label
  TextField: typeof TelInputTextField
}
const TelInput: FC<HTMLAttributes<HTMLDivElement>> & IStaticComponents = ({
  children,
  ...props
}) => {
  return (
    <div data-ui-form-control-tel-input {...props}>
      <FormControl>{children}</FormControl>
    </div>
  )
}
TelInput.Label = Label
TelInput.TextField = TelInputTextField

export { TelInput }
