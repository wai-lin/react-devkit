import { useContext, useState } from 'react'
import { Switch } from 'components/switch/switch'
import { AppContext } from '../pages/_app'

const SwitchSample = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div className="flex items-center space-x-2">
      <Switch.Toggle
        checked={isChecked}
        onChange={e => setIsChecked(e.target.checked)}
        className="text-green-500"
      />
      <p className="m-0">isChecked : {isChecked.toString()}</p>
    </div>
  )
}

const SwitchStyling = () => {
  const [isChecked, setIsChecked] = useState(false)
  const appContext = useContext(AppContext)
  return (
    <>
      <p className="m-0">isChecked: {isChecked.toString()}</p>
      <div className="flex items-center space-x-2">
        <Switch.Toggle
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
          className="text-red-400"
        />
        <Switch.Toggle
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
          className="text-yellow-400"
        />
        <Switch.Toggle
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
          className="text-green-400"
          focusStyle={appContext.theme === 'dark' ? 'ring-offset-gray-800' : ''}
        />
        <Switch.Toggle
          isRect
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
          className="rounded text-blue-400"
          focusStyle={appContext.theme === 'dark' ? 'ring-offset-gray-800' : ''}
        />
      </div>
    </>
  )
}

const SwitchWithLabel = () => {
  const appContext = useContext(AppContext)
  return (
    <Switch>
      <Switch.Toggle
        checked={appContext.theme === 'dark'}
        onChange={() => {
          if (appContext.setTheme)
            appContext.setTheme(appContext.theme === 'dark' ? 'light' : 'dark')
        }}
        className="text-gray-600"
        focusStyle={appContext.theme === 'dark' ? 'ring-offset-gray-800' : ''}
      />
      <Switch.Label>
        {appContext.theme} : you can also click me to change theme
      </Switch.Label>
    </Switch>
  )
}

export { SwitchSample, SwitchStyling, SwitchWithLabel }
