// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────────
      fontFamily: {
        display: ['Syne', ...defaultTheme.fontFamily.sans],
        body:    ['DM Sans', ...defaultTheme.fontFamily.sans],
      },

      // ── Colors (CSS-variable driven — theme-aware) ────
      colors: {
        bg:       'var(--color-bg)',
        surface:  'var(--color-surface)',
        surface2: 'var(--color-surface2)',
        accent:   'var(--color-accent)',
        border:   'var(--color-border)',
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
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
