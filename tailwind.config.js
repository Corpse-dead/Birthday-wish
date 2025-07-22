/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          'rose': '#FF69B4',
          'blush': '#FFB6C1',
          'coral': '#FF7F7F',
          'lavender': '#E6E6FA',
          'pink': '#FFC0CB',
          'deep-rose': '#C21807',
          'gold': '#FFD700',
          'warm-white': '#FFF8DC'
        },
        brown: {
          'light': '#F5E6D3',
          'cream': '#E8D5C1',
          'beige': '#DCC5A7',
          'caramel': '#C8A882',
          'chocolate': '#8B4513',
          'cocoa': '#7B3F00',
          'espresso': '#5D4037',
          'dark': '#3E2723',
          'rose-gold': '#E8B4B8',
          'warm-cream': '#FDF5E6'
        }
      },
      fontFamily: {
        'romantic': ['Pacifico', 'cursive'],
        'elegant': ['Dancing Script', 'cursive'],
        'love': ['Poppins', 'sans-serif']
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
