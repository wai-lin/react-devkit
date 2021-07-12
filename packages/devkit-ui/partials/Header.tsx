import { FC, HTMLAttributes, useContext } from 'react'
import Link from 'next/link'

import { AppContext } from '../pages/_app'
import { Heading } from '../src/components/heading/heading'
import { Switch } from '../src/components/switch/switch'

const Header: FC<HTMLAttributes<HTMLElement>> = () => {
  const appContext = useContext(AppContext)
  return (
    <header className="h-16 p-4 bg-gray-800 fixed top-0 inset-x-0 border-b border-indigo-50 dark:border-gray-600 z-20 flex items-center justify-between dark:text-white">
      <Heading tag="h5" className="text-indigo-400 select-none">
        <Link href="/">React Tailwind Components</Link>
      </Heading>
      <Switch>
        <Switch.Label className="text-white">
          Theme: {appContext.theme === 'dark' ? 'dark' : 'light'}
        </Switch.Label>
        <Switch.Toggle
          checked={appContext.theme === 'dark'}
          onChange={() => {
            if (appContext.setTheme)
              appContext.setTheme(
                appContext.theme === 'light' ? 'dark' : 'light',
              )
          }}
          focusStyle="ring-offset-gray-800"
          className={
            appContext.theme === 'dark' ? 'text-indigo-800' : 'text-indigo-600'
          }
        >
          <Switch.On className="pl-1 pt-[2px]">🌛</Switch.On>
          <Switch.Off className="pl-1 pt-[2px]">🌞</Switch.Off>
        </Switch.Toggle>
      </Switch>
    </header>
  )
}

export { Header as default }
