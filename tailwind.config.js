/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          sm: '2rem',
          lg: '2rem',
          xl: '4rem',
          '2xl': '8rem',
          center: true
        }
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}

