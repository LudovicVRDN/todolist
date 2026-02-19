/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#da373d",
        secondary: "#22F",
        colorLight: "#EEE",
      },
    },
  },
  plugins: [],
};