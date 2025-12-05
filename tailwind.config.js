/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This overrides the default 'sans' font
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        // We define our custom brand colors here for consistency
        primary: '#0d9488', // Teal-600
        secondary: '#0f766e', // Teal-700
      }
    },
  },
  plugins: [],
}