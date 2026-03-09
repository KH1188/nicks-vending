import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        brand: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.10), 0 1px 3px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 8px 20px 0 rgba(0,0,0,0.13), 0 3px 6px -2px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
} satisfies Config
