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
      },
    },
    plugins: [],
  }
  