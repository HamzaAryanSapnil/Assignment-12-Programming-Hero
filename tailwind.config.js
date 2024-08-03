/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        "inter": ['Inter', 'sans-serif'],
        "fira-sans": ['Fira Sans', 'sans-serif'],
        "libre-franklin": ['Libre Franklin', 'sans-serif']
      },

      colors: {
        'dark': '#0f172a',
        'light': '#f8fafc',
        "dark-03": "#737373",
        "vdo-btn": "#222b45",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}