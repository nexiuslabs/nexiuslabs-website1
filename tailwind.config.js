/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        nexius: {
          navy: '#1D2A4D',     // Deep navy for trust and stability
          teal: '#00CABA',     // Electric teal for modern tech feel
          gray: '#F5F7FA',     // Cool gray for backgrounds
          charcoal: '#3A3A3A', // Charcoal for readable text
          muted: '#6B7280',    // Additional muted color
        },
        primary: '#1D2A4D',
        accent: '#00CABA',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
