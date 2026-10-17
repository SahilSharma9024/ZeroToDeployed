/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          rose: "#ffe4e6",      // rose-100
          roseDark: "#e11d48",  // rose-600
          lavender: "#ede9fe",  // violet-100
          lavenderDark: "#7c3aed", // violet-600
          purple: "#f3e8ff",    // purple-100
          purpleDark: "#9333ea", // purple-600
          peach: "#ffedd5",     // orange-100
          peachDark: "#ea580c",  // orange-600
          mint: "#dcfce7",      // emerald-100
          mintDark: "#059669",   // emerald-600
          sky: "#e0f2fe",       // sky-100
          skyDark: "#0284c7",    // sky-600
          lemon: "#fef9c3",     // yellow-100
          offwhite: "#f8fafc",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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

