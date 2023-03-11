/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        brown: '#936464',
        'dark-grey': '#474747',
        teal: '#649393',
        white: '#FFFFFF',
        'light-silver': '#F5F5F5',
        'dark-silver': '#D9D9D9'
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
}