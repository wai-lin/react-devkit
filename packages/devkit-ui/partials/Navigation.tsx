import { FC, HTMLAttributes } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/dist/client/router'
import { Heading } from '../src/components/heading/heading'

const components = [
  { name: 'Button', path: '/button' },
  { name: 'Checkbox', path: '/checkbox' },
  { name: 'Form Control', path: '/form-control' },
  { name: 'Heading', path: '/heading' },
  { name: 'Input', path: '/input' },
  { name: 'Label', path: '/label' },
  { name: 'Otp Input', path: '/otp-input' },
  { name: 'Radio', path: '/radio' },
  { name: 'Switch', path: '/switch' },
  { name: 'Tel Input', path: '/tel-input' },
]

const Navigation: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const router = useRouter()
  return (
    <>
      <nav
        className={clsx(
          className,
          'pt-16 max-h-screen h-screen max-w-[15%] w-full',
          'bg-gray-200 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600',
        )}
        {...props}
      >
        <Heading
          tag="h6"
          className="px-4 h-16 border-b border-gray-300 dark:border-white flex items-center"
        >
          Components
        </Heading>
        <section className="overflow-auto">
          {components.map(({ name, path }) => (
            <Link key={path} href={`/c${path}`}>
              <a
                className={clsx(
                  'block px-4 py-2',
                  router.pathname === `/c${path}`
                    ? 'font-bold dark:bg-gray-700 dark:text-indigo-400'
                    : 'font-normal',
                )}
              >
                {name}
              </a>
            </Link>
          ))}
        </section>
      </nav>
      <style jsx>{`
        section {
          height: calc(100vh - (4rem + 2.5rem));
        }
      `}</style>
    </>
  )
}

export { Navigation as default }
