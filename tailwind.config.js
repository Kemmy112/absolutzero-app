// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0f2027',
        'primary-light': '#2c5364',
        secondary: '#a0e9ff',
        accent: '#00d4ff',
        'accent-dark': '#00a6cc',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

