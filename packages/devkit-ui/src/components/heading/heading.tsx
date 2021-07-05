import clsx from 'clsx'
import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react'

interface IHeadingProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
const Heading: FC<HTMLAttributes<HTMLHeadingElement> & IHeadingProps> = ({
  tag = 'h1',
  className,
  ...props
}) => {
  type TFontSize =
    | 'text-6xl'
    | 'text-5xl'
    | 'text-4xl'
    | 'text-3xl'
    | 'text-2xl'
    | 'text-xl'
  const [fontSize, setFontSize] = useState<TFontSize>('text-6xl')
  // define tag
  const H = tag
  // define font size func
  const defineFontSize = useCallback(() => {
    switch (tag) {
      case 'h1':
        return 'text-6xl'
      case 'h2':
        return 'text-5xl'
      case 'h3':
        return 'text-4xl'
      case 'h4':
        return 'text-3xl'
      case 'h5':
        return 'text-2xl'
      default:
        return 'text-xl'
    }
  }, [tag])
  // define font size of tag
  useEffect(() => {
    setFontSize(defineFontSize())
  }, [tag, defineFontSize])
  return <H className={clsx(fontSize, className)} {...props} />
}

export { Heading }
