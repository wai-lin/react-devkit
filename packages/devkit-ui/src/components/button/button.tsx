import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'

interface IStaticComponents {
  Circle: typeof ButtonCircle
}
interface IButtonProps {
  disabled?: boolean
}
const Button: FC<HTMLAttributes<HTMLButtonElement> & IButtonProps> &
  IStaticComponents = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

const ButtonCircle: FC<HTMLAttributes<HTMLButtonElement> & IButtonProps> = ({
  'aria-label': ariaLabel,
  className,
  ...props
}) => {
  return (
    <Button
      aria-label={ariaLabel || ''}
      className={clsx(
        'p-0 rounded-full grid place-items-center text-center',
        className,
      )}
      {...props}
    />
  )
}

Button.Circle = ButtonCircle

export { Button }
