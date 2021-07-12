import { Button } from 'components/button/button'

const ButtonSample = () => {
  return (
    <section className="flex items-center space-x-4">
      <Button
        onClick={() => alert('clicked!')}
        className="bg-blue-300 text-gray-800"
      >
        Click Me
      </Button>
      <Button.Circle
        style={{ width: '40px', height: '40px' }}
        onClick={() => alert('clicked!')}
        className="bg-blue-300"
      >
        🚀
      </Button.Circle>
    </section>
  )
}

const ButtonStyling = () => {
  return (
    <section className="flex items-center space-x-4">
      <Button className="text-gray-800 bg-red-300 hover:bg-red-400 active:bg-red-300 focus:ring-red-400 dark:focus:ring-offset-gray-800">
        Styled Button
      </Button>
      <Button className="rounded-full text-gray-800 bg-red-300 hover:bg-red-400 active:bg-red-300 focus:ring-red-400 dark:focus:ring-offset-gray-800">
        Rounded Button
      </Button>

      <Button className="px-2 py-0 text-gray-800 bg-red-300 hover:bg-red-400 active:bg-red-300 focus:ring-red-400 dark:focus:ring-offset-gray-800">
        Small Button
      </Button>
      <Button className="px-2 py-0 rounded-full text-gray-800 bg-red-300 hover:bg-red-400 active:bg-red-300 focus:ring-red-400 dark:focus:ring-offset-gray-800">
        Small Rounded Button
      </Button>

      <Button.Circle className="w-12 h-12 bg-red-300 hover:bg-red-400 active:bg-red-300 focus:ring-red-400 dark:focus:ring-offset-gray-800">
        🚀
      </Button.Circle>
      <Button.Circle
        style={{ width: '60px', height: '60px' }}
        className="bg-red-300 hover:bg-red-400 active:bg-red-300 focus:ring-red-400 dark:focus:ring-offset-gray-800"
      >
        🧨
      </Button.Circle>

      <Button className="rounded-full" disabled>
        Rounded Button
      </Button>
      <Button.Circle className="w-12 h-12" disabled>
        🚀
      </Button.Circle>
    </section>
  )
}

export { ButtonSample, ButtonStyling }
