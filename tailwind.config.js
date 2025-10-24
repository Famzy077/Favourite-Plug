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
          background: '#ffffff',
          foreground: '#171717',
          primary: '#007BFF',
          text: '#2C2C2C',
          Secondary: '#C0C0C0',
          accent: '#FF4081',
          high: '#FF4081'
        },
        keyframes: {
          shimmer: {
            '100%': {
              transform: 'translateX(100%)',
            },
          },
          fadeIn: {
            '0%': {
              opacity: '0',
              transform: 'translateY(10px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
        },
        animation: {
          fadeIn: 'fadeIn 0.5s ease-out',
        },
      },
    },
    plugins: [],
  }
  