/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {},
    extend: {
      backgroundImage: {
        hero: "url('/background.png')",
      },
      colors: {
        primary: "#8f00ff",
        form: "#fff0f0ad",
        borderColor: "#fcddec",
      },
    },
  },
  plugins: [],
};
