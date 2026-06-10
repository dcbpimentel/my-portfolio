// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────────
      fontFamily: {
        display: ['Syne', ...defaultTheme.fontFamily.sans],
        body:    ['DM Sans', ...defaultTheme.fontFamily.sans],
      },

      // ── Colors ────────────────────────────────────────
      colors: {
        bg:      '#0A0A0A',
        surface: '#141414',
        accent:  '#E8FF4D',
        border:  '#2A2A2A',
        text: {
          primary:   '#F5F5F5',
          secondary: '#888888',
        },
      },

      // ── Spacing Scale (8pt grid) ──────────────────────
      spacing: {
        'section': '96px',
        'block':   '48px',
        'element': '24px',
        'tight':   '12px',
      },

      // ── Max Content Width ─────────────────────────────
      maxWidth: {
        'content': '1120px',
        'prose':   '680px',
        'narrow':  '480px',
      },
    },
  },
  plugins: [],
}
