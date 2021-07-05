import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'

interface IStaticComponents {
  Circle: typeof ButtonCircle
}
const Button: FC<HTMLAttributes<HTMLButtonElement>> & IStaticComponents = ({
  children,
  ...props
}) => {
  return <button {...props}>{children}</button>
}

const ButtonCircle: FC<HTMLAttributes<HTMLButtonElement>> = ({
  'aria-label': ariaLabel,
  className,
  ...props
}) => {
  return (
    <Button
      aria-label={ariaLabel || ''}
      className={clsx('p-0 rounded-full grid place-items-center', className)}
      {...props}
    />
  )
}

Button.Circle = ButtonCircle

export { Button }
