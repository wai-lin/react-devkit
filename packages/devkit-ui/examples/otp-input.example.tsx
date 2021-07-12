import { useState } from 'react'
import { OtpInput } from 'components/otp-input/otp-input'
import { Button } from 'components/button/button'

const OtpInputSample = () => {
  const [otp, setOtp] = useState('')
  return (
    <>
      <p>OTP : {otp}</p>
      <div className="flex space-x-2">
        <OtpInput.Group value={otp} setValue={setOtp}>
          <OtpInput index={0} />
          <OtpInput index={1} />
          <OtpInput index={2} />
          <OtpInput index={3} />
        </OtpInput.Group>
        <Button
          onClick={() => setOtp('')}
          className="bg-indigo-400 text-gray-700"
        >
          Clear Otp
        </Button>
      </div>
    </>
  )
}

export { OtpInputSample }
