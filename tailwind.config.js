/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: '#0C0C0C',
        DarkAccent: '#111111',
        QuietText: '#7E7A72',
        Accent: '#E4A85E',
        BrightAccent: '#F99D2B',
        Text: '#F5F2EC',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
