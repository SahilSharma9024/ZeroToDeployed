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
        pastel: {
          rose: "#ffe4e6",
          roseDark: "#e11d48",
          lavender: "#ede9fe",
          lavenderDark: "#7c3aed",
          purple: "#f3e8ff",
          purpleDark: "#9333ea",
          peach: "#ffedd5",
          peachDark: "#ea580c",
          mint: "#dcfce7",
          mintDark: "#059669",
          sky: "#e0f2fe",
          skyDark: "#0284c7",
          lemon: "#fef9c3",
          offwhite: "#f8fafc",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px -4px rgba(0, 0, 0, 0.07)',
        'pastel-rose': '0 8px 24px -4px rgba(244, 63, 94, 0.15)',
        'pastel-purple': '0 8px 24px -4px rgba(168, 85, 247, 0.15)',
        'pastel-mint': '0 8px 24px -4px rgba(34, 197, 94, 0.15)',
      }
    },
  },
  plugins: [],
}
