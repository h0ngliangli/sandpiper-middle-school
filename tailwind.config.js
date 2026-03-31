/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#1B2580',
        beige: '#efead7',
        sandpiper: {
          blue: '#1e3a8a',
          'muted-blue': '#0A3E5E',
          gold: '#F5A623',
          dark: '#0A0A0A',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
