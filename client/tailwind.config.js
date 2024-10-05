/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-nav': '#1C212D',
      },
    },
  },
  variants: {},
  plugins: [
    require('daisyui'),
  ],
}