/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dev: {
          bg: '#090a0f',       // Deep obsidian terminal background
          surface: '#111319',  // Sleek surface panel
          card: '#161821',     // High-contrast card element
          hover: '#1c1f2b',    // Hover state
          border: '#252936',   // Hairline border
          muted: '#8b92a5',    // Secondary muted text
          text: '#f1f3f9',     // Primary crisp text
          emerald: '#10b981',  // Efficiency green
          blue: '#3b82f6',     // Dev blue
          amber: '#f59e0b',    // Warning amber
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'dev-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24)',
        'dev-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'dev-popup': '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
