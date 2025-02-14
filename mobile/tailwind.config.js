/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#354F52",
        secondary: "#2F3E46",
        accent: "#52796F",
        info: "#84A98C",
        light: "#CAD2C5",
      },
    },
  },
  plugins: [],
};
