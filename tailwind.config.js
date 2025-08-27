/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Etsy-inspired warm palette
        brand: {
          DEFAULT: "#F1641E",
          50: "#FEF7F4",
          100: "#FDE8E0",
          200: "#FBD1C1",
          300: "#F8B39A",
          400: "#F48F6B",
          500: "#F1641E",
          600: "#E65A17",
          700: "#CC4F14",
          800: "#A13F10",
          900: "#7A300C",
        },
        cream: "#FAF3EF",
        sand: "#EDE5DF",
        ink: {
          DEFAULT: "#1F2937",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        moss: {
          DEFAULT: "#3F7A5E",
          50: "#F0F9F6",
          100: "#DCF2E9",
          200: "#BBE4D3",
          300: "#8CD0B8",
          400: "#5AB59A",
          500: "#3F7A5E",
          600: "#2F5A46",
          700: "#254A3A",
          800: "#1E3C2F",
          900: "#1A3228",
        },
        rose: "#D45D79",
        accent: "#2B6CB0",
        border: "#E5E7EB",

        // Dark mode variants
        "d-bg": "#0F1115",
        "d-card": "#12161C",
        "d-ink": "#E5E7EB",
        "d-border": "#374151",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Merriweather", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        hover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        soft: "0 2px 8px 0 rgb(0 0 0 / 0.06)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "marquee-slow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out both",
        "slide-up": "slide-up 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) both",
        "scale-in": "scale-in 0.2s ease-out both",
        "marquee-slow": "marquee-slow 30s linear infinite",
      },
    },
  },
  plugins: [],
};
