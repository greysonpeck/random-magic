/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        "2xl": "0 35px 35px -15px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
