import { Children, cloneElement, FC, isValidElement } from 'react'

const ToC: FC = ({ children }) => {
  const Li = () => {
    return Children.map(children, child => {
      if (isValidElement(child) && child.props.mdxType === 'ToC')
        return <li>{child}</li>
      if (isValidElement(child) && child.props.mdxType !== 'a')
        throw new Error(
          '<ToC/> component can only accept <a></a> element with `data-toc-to` prop.',
        )
      let Child = child
      if (isValidElement(child) && child.props.mdxType === 'a') {
        Child = cloneElement(child, {
          className: 'cursor-pointer',
          onClick: function(e: any) {
            const toScrollEl = document.getElementById(
              e.target.attributes['data-toc-to'].value + '',
            )
            document.getElementById('main-content')?.scrollTo({
              top: toScrollEl?.offsetTop ? toScrollEl?.offsetTop - 100 : 0,
              behavior: 'smooth',
            })
          },
        })
      }
      return <li>{Child}</li>
    })
  }
  return <ul className="text-gray-800 dark:text-white">{Li()}</ul>
}

export { ToC as default }
