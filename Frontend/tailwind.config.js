/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom colors if they were used in the original project implicitly
        // The HTML used standard blue-900, orange-500 etc.
      }
    },
  },
  plugins: [],
}
