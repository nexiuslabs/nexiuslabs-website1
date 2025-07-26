/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nexius-navy': '#1D2A4D',
        'nexius-teal': '#00CABA',
        'nexius-dark-bg': '#0F1419',
        'nexius-dark-surface': '#1A1F2E',
        'nexius-dark-card': '#242938',
        'nexius-dark-border': '#2A2F3E',
        'nexius-dark-border-light': '#3C4252',
        'nexius-dark-text': '#E5E7EB',
        'nexius-dark-text-muted': '#9CA3AF',
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}