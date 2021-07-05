import { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Button } from 'components/button/button'

const ScrollTopBtn: FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <Button.Circle
      aria-label="scroll to top"
      onClick={() => {
        document.getElementById('main-content')?.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
      className={clsx(
        'w-10 h-10 text-white',
        'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600',
        'focus:ring-indigo-400 dark:focus:ring-offset-gray-800',
        className,
      )}
      {...props}
    >
      ⬆
    </Button.Circle>
  )
}

export { ScrollTopBtn as default }
