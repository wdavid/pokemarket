/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pikachu: '#FFCC00',
        pokeball: '#FF4C4C',
        skyblue: '#3DC7EF',
        darkgray: '#2E2E2E',
        softgray: '#F5F5F5',
        leafgreen: '#48D597',

        light: {
          background: '#FFFFFF',
          foreground: '#2E2E2E',
          card: '#F5F5F5',
        },
        dark: {
          background: '#1A1A1A',
          foreground: '#FFFFFF',
          card: '#2E2E2E',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
