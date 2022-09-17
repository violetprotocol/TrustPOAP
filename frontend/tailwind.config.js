module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    darkTheme: "pastel",
  },
};
