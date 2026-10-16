/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        surface: {
          light: "rgba(255, 255, 255, 0.05)",
          base: "rgba(10, 10, 18, 0.7)",
          border: "rgba(255, 255, 255, 0.1)",
        },
        electric: {
          blue: "#00d2ff",
          indigo: "#3a7bd5",
          violet: "#9d4edd",
          purple: "#7b2cbf",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-pan": "gradientPan 7s ease infinite",
      },
      keyframes: {
        gradientPan: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
