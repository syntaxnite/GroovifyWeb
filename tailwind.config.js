/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-black': '#191414',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backgroundColor: {
        dark: '#121212',
        light: '#ffffff',
        cream: '#f5f5dc',
      },
      textColor: {
        dark: '#ffffff',
        light: '#121212',
        cream: '#333333',
      },
    },
  },
  plugins: [],
};
