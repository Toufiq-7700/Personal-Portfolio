/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f0e8db',
          alt: '#e8ddd0',
          light: '#f8f4ee',
        },
        dark: {
          DEFAULT: '#1a1208',
          mid: '#3d2b1f',
          light: '#2a1f15',
        },
        maroon: {
          DEFAULT: '#7a1f1f',
          light: '#9b2c2c',
          dark: '#5c1717',
        },
        accent: {
          DEFAULT: '#8b3a1e',
          light: '#a44825',
          dark: '#6d2e17',
        },
        muted: '#7a6a58',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
