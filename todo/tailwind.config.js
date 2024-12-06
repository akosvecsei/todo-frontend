/** @type {import('tailwindcss').Config} */

const plugin = require('tailwind-scrollbar');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkScrollbar: '#444444',
        darkThumb: '#222222',
      },
    },
  },
  plugins: [
    plugin({ nocompatible: true }),
  ],
}

