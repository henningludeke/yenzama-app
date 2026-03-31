/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B6B4A",
        secondary: "#F5A623",
        surface: "#F7F7F7",
        "text-primary": "#1A1A1A",
        "text-secondary": "#555555",
        error: "#D32F2F",
        success: "#2E7D32",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        pill: "24px",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        '360': '360px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
