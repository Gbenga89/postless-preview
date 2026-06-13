import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg:       '#0a0a0a',
        'bg-1':   '#111111',
        'bg-2':   '#181818',
        border:   '#252525',
        'border-l':'#303030',
        ink:      '#e8e6e0',
        'ink-2':  '#888882',
        'ink-3':  '#555550',
        accent:   '#d4ff70',
        'accent-dim': '#a8cc4a',
      },
      maxWidth: { content: '1080px' },
      borderRadius: { card: '10px' },
      typography: {
        // prose styles for blog posts
        DEFAULT: {
          css: {
            '--tw-prose-body':        '#888882',
            '--tw-prose-headings':    '#e8e6e0',
            '--tw-prose-links':       '#d4ff70',
            '--tw-prose-bold':        '#e8e6e0',
            '--tw-prose-counters':    '#555550',
            '--tw-prose-bullets':     '#555550',
            '--tw-prose-hr':          '#252525',
            '--tw-prose-quotes':      '#e8e6e0',
            '--tw-prose-quote-borders':'#303030',
            '--tw-prose-code':        '#d4ff70',
            '--tw-prose-pre-code':    '#e8e6e0',
            '--tw-prose-pre-bg':      '#111111',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
