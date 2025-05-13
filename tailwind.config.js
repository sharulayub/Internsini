/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        gray: {
          750: '#2D3748',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            maxWidth: '65ch',
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            a: {
              color: theme('colors.blue.600'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            a: {
              color: theme('colors.blue.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'html': { fontSize: '16px' },
      })
    },
  ],
};