/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode manually or system
  theme: {
    extend: {
      colors: {
        background: '#09090b', // zinc-950
        surface: '#18181b', // zinc-900
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          glow: '#06b6d4', // cyan-500
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #3b82f6, #06b6d4)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
