/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      backgroundImage: {
        "image": "url('/src/images/bg.webp')",
      },
    },
  },
  plugins: [],
};
