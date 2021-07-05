const rootConfig = require('../../tailwind.config')

const config = {
  ...rootConfig,
  mode: 'jit',
  darkMode: 'class',
  purge: (() =>
    process.env.NODE_ENV === 'build'
      ? ['./src/components/**/*.{js,ts,jsx,tsx}']
      : [
          './pages/**/*.{js,ts,jsx,tsx,mdx}',
          './partials/**/*.{js,ts,jsx,tsx}',
          './examples/**/*.{js,ts,jsx,tsx}',
          './src/components/**/*.{js,ts,jsx,tsx}',
        ])(),
}

const withImportant = conf => {
  return process.env.NODE_ENV === 'build'
    ? conf
    : { ...conf, important: '.important' }
}

module.exports = withImportant(config)
