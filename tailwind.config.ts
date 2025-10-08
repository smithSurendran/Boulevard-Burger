import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f97316", // Orange-500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#b45309", // Darker orange
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
}

export default config
