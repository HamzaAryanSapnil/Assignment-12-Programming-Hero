/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "fira-sans": ["Fira Sans", "sans-serif"],
        "libre-franklin": ["Libre Franklin", "sans-serif"],
        "libre-baskerville": ["Libre Baskerville", "serif"],
      },

      colors: {
        dark: "#0f172a",
        light: "#f8fafc",
        "dark-03": "#737373",
        "vdo-btn": "#222b45",
      },

      keyframes: {
        showContent: {
          "0%": {
            transform: "translateY(12px)",
            filter: "blur(30px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            filter: "blur(0px)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
