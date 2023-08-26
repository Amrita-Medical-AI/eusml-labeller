/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        'offwhite': '#283C56',
        'dark-blue': '#1A4FA5',
        'std-teal': '#00DBA8',
        'background': '#0A203B'
    },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
