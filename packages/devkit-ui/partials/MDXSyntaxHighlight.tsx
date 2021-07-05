import { FC, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import clsx from 'clsx'

// mdx
import { MDXProvider } from '@mdx-js/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import lightTheme from 'prism-react-renderer/themes/github'

import { Button } from '../src/components/button/button'

// pre tag
const Pre: FC = (props: any) => <div {...props} />

// code tag
const Code: FC<any & typeof Highlight> = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : ''
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const ThemeButton = () =>
    language ? (
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={clsx(
          'p-0 w-8 h-8 float-right rounded-full',
          'bg-indigo-400 hover:bg-indigo-300 active:bg-indigo-400',
          'focus:ring-0 focus:ring-offset-0',
        )}
      >
        {theme === 'dark' ? '🌙' : '🌕'}
      </Button>
    ) : null
  const CodeLineNumber = ({ lineNumber }: { lineNumber: number }) =>
    language ? (
      <span
        className={clsx(
          'px-1 select-none bg-opacity-10 border-b',
          theme === 'dark'
            ? 'bg-white border-white'
            : 'bg-gray-900 border-gray-800',
        )}
      >
        {lineNumber < 10 ? `0${lineNumber}` : lineNumber}
      </span>
    ) : null
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme === 'dark' ? darkTheme : lightTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(className, 'whitespace-pre-wrap')}
          style={{ ...style, padding: '20px' }}
        >
          <ThemeButton />
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line, key: i })}
              className="flex items-stretch space-x-2"
            >
              <CodeLineNumber lineNumber={i + 1} />
              <span className="self-center">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const WithMDXSyntaxHighlight = (props: any) => {
  const router = useRouter()
  return (
    <MDXProvider components={{ pre: Pre, code: Code }}>
      <main
        className={clsx(
          props.className,
          router.pathname === '/' ? '' : 'prose dark:prose-white',
        )}
        {...props}
      >
        {props.children}
      </main>
    </MDXProvider>
  )
}

export { WithMDXSyntaxHighlight as default }
