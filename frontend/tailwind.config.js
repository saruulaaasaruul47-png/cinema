/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cinema: {
          red: "#E50914",
          "red-dark": "#b0060f",
          bg: "#0a0a0a",
          card: "#111111",
          card2: "#1a1a1a",
          border: "#2a2a2a",
          text: "#ffffff",
          muted: "#888888",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
