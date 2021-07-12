import { Checkbox } from 'components/checkbox/checkbox'
import { useState } from 'react'

const CheckboxSample = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Checkbox.Input id="checkbox-id" />
        <label htmlFor="checkbox-id">tick me</label>
      </div>
      <Checkbox>
        <Checkbox.Input
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
        <Checkbox.Label>is checked : {isChecked.toString()}</Checkbox.Label>
      </Checkbox>
    </div>
  )
}

const CheckboxStyling = () => {
  return (
    <div className="flex items-center space-x-4">
      <Checkbox>
        <Checkbox.Input className="text-red-400" />
        <Checkbox.Label>red check</Checkbox.Label>
      </Checkbox>
      <Checkbox>
        <Checkbox.Input className="text-yellow-400" />
        <Checkbox.Label>yellow check</Checkbox.Label>
      </Checkbox>
      <Checkbox>
        <Checkbox.Input className="text-green-400" />
        <Checkbox.Label>green check</Checkbox.Label>
      </Checkbox>
      <Checkbox>
        <Checkbox.Input className="rounded-full text-blue-400" />
        <Checkbox.Label>circle check</Checkbox.Label>
      </Checkbox>
    </div>
  )
}

export { CheckboxSample, CheckboxStyling }
