```javascript
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#111827',     // dark bg
        surface:    '#1F2937',     // darker card bg
        text:       '#F9FAFB',     // light text
        muted:      '#9CA3AF',     // secondary text
        primary:    '#10B981',     // accent/brand
        'primary-dark': '#059669', // hover accent
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
    typography()
  ],
}
```