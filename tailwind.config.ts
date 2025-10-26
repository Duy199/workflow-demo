import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#020429',
        'neon-green': '#39FF14',
        'mercury': '#E2E0F1',
        'pearl': '#F2F2F2',
        'dark-green': '#00CA00',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
