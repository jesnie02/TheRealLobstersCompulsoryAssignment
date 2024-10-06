/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lobsterRed: '#D32F2F',
        white: '#FFFFFF',
        lightGray: '#F5F5F5',
        darkGray: '#424242',
        navyBlue: '#2C3E50',
        softBeige: '#F0EAD6',
        coral: '#FF6F61',
        aquaBlue: '#00BFA5',
        lightPink: '#FFB6C1',
      },
    },
  },
  variants: {},
  plugins: [
    require('daisyui'),
  ],
}