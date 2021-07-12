import { useState } from 'react'
import { TelInput } from 'components/tel-input/tel-input'

const TelInputSample = () => {
  const [phone, setPhone] = useState('')
  return (
    <TelInput>
      <TelInput.Label>Enter phone number</TelInput.Label>
      <TelInput.TextField
        country="MM"
        value={phone}
        setValue={setPhone}
        format="international"
        className="text-gray-800"
      />
    </TelInput>
  )
}

export { TelInputSample }
