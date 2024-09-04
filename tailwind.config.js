/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#695CCD',
        secondary: '#2C0063',
        accent: '#FFB23D',
        background: '#F4F2FF',
        title: '#1F1283',
        text: "#717171",
        text2: "#1E1E1E"
      },
    },
  },
  plugins: [],
}

