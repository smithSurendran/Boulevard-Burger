/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bb: {
          red: '#FF3B3B',     // Logo red
          black: '#000000',
          white: '#FFFFFF',
          paper: '#F5F5F5',   // Light gray background
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Fredoka One"', 'cursive'],
        fun: ['"Luckiest Guy"', 'cursive'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        diner: '4px 4px 0 #000', // black shadow like retro signage
      },
    },
  },
  plugins: [],
}
