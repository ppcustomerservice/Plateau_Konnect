const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "460px",
      "custom-874breakpoint": "874px", // Your custom breakpoint
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        shine: "shine 1.5s infinite",
        fadeIn: "fadeIn 2s ease-in",
      },
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      
    },
  },
  plugins: [],
};
