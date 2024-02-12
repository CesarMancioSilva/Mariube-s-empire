/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      roboto:['Roboto']
    },
    screens: {
      'cell': '450px',
      'lg':'1024px',
      'sm':'640px'
      // => @media (min-width: 640px) { ... }

    },
  },
  plugins: [],
}

