const typoWhiteTheme = theme => ({
  css: {
    color: theme('colors.white'),
    h1: {
      color: theme('colors.white'),
    },
    h2: {
      color: theme('colors.white'),
    },
    h3: {
      color: theme('colors.white'),
    },
    h4: {
      color: theme('colors.white'),
    },
    h5: {
      color: theme('colors.white'),
    },
    h6: {
      color: theme('colors.white'),
    },
    a: {
      color: theme('colors.white'),
    },
  },
})

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: theme('width.full'),
          },
        },
        white: typoWhiteTheme(theme),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
