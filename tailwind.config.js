/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#3E3E42',
        'custom-white': '#FFFFFF',
        'custom-dark': '#252526',
      },
    },
  },
  plugins: [],
}
