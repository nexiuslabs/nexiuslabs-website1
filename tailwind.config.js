/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexius-navy': '#1D2A4D',
        'nexius-teal': '#00CABA', 
        'nexius-gray': '#F5F7FA',
        'nexius-charcoal': '#3A3A3A',
        primary: '#1D2A4D',
        accent: '#00CABA',
        muted: '#F5F7FA'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}