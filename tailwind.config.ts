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
        // Neon design tokens — extracted from the two 2026 logo marks
        // (skyline = hero mark, circle = nav/favicon mark). Used by the
        // /nightlife (dark) and /cards (light) route trees.
        ink: {
          DEFAULT:     '#060608',
          elevated:    '#0E0E16',
          'elevated-2': '#16151F',
          border:      '#232233',
        },
        paper: {
          DEFAULT:  '#FBFAFD',
          elevated: '#FFFFFF',
          border:   '#E7E3F0',
        },
        neon: {
          blue:    '#3E8EFF',
          violet:  '#8B5CF6',
          magenta: '#E93FE0',
        },
      },
      backgroundImage: {
        'neon-gradient':      'linear-gradient(135deg, #3E8EFF 0%, #8B5CF6 50%, #E93FE0 100%)',
        'neon-gradient-text': 'linear-gradient(90deg, #3E8EFF 0%, #8B5CF6 50%, #E93FE0 100%)',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.10), 0 1px 3px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 8px 20px 0 rgba(0,0,0,0.13), 0 3px 6px -2px rgba(0,0,0,0.07)',
        neon:      '0 0 20px -2px rgba(139,92,246,0.55), 0 0 40px -10px rgba(62,142,255,0.4)',
        'neon-sm': '0 0 10px -1px rgba(139,92,246,0.5)',
        'neon-soft': '0 4px 24px -6px rgba(139,92,246,0.25), 0 0 0 1px rgba(139,92,246,0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config
