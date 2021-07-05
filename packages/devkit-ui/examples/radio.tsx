import { useState } from 'react'
import { Radio } from 'components/radio/radio'
import { Button } from 'components/button/button'

const RadioSample = () => {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Radio.Input id="radio-id" />
        <label htmlFor="radio-id">select me</label>
      </div>
      <Radio>
        <Radio.Input
          checked={isSelected}
          onChange={e => setIsSelected(e.target.checked)}
        />
        <Radio.Label>radio selected : {isSelected.toString()}</Radio.Label>
      </Radio>
      <Button
        onClick={() => setIsSelected(false)}
        className="px-1 py-0 bg-indigo-400 focus:ring-indigo-400 dark:focus:ring-gray-800"
      >
        clear
      </Button>
    </div>
  )
}

const RadioGrouping = () => {
  const [selected, setSelected] = useState('')
  const options = ['HTML', 'CSS', 'JS']
  return (
    <>
      <p>selected option : {selected}</p>
      <Radio.Group>
        {options.map(op => (
          <Radio key={op}>
            <Radio.Input
              checked={selected === op}
              value={op}
              onChange={e => setSelected(e.target.value)}
            />
            <Radio.Label>{op}</Radio.Label>
          </Radio>
        ))}
      </Radio.Group>
    </>
  )
}

const RadioStyling = () => {
  return (
    <div>
      <Radio>
        <Radio.Input className="text-red-400" />
        <Radio.Label>red radio</Radio.Label>
      </Radio>
      <Radio>
        <Radio.Input className="text-yellow-400" />
        <Radio.Label>yellow radio</Radio.Label>
      </Radio>
      <Radio>
        <Radio.Input className="text-green-400" />
        <Radio.Label>green radio</Radio.Label>
      </Radio>
      <Radio>
        <Radio.Input className="rounded text-blue-400" />
        <Radio.Label>rounded radio</Radio.Label>
      </Radio>
    </div>
  )
}

export { RadioSample, RadioGrouping, RadioStyling }
