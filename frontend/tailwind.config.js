/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        'royal-blue': '#1E3A8A', // Dark Royal Blue
        'light-gray': '#F9FAFB', // Off-white
        'dark-bg': '#0F172A', // Dark background color
        'dark-card': '#1E293B', // Dark card color
      },
      // width: {
      //   'screen-98vw': 'calc(100vw )',
      // },
    },
  },
  plugins: [],
};