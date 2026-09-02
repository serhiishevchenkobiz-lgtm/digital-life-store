import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F6F2EA",
          deep: "#EFE9DC",
          bright: "#FBF8F1",
        },
        ink: {
          DEFAULT: "#1A1714",
          soft: "#3A352E",
          muted: "#6B645B",
        },
        accent: {
          DEFAULT: "#B23A2F",
          deep: "#8E2A22",
          soft: "#D26B61",
        },
        muted: {
          DEFAULT: "#E5DED1",
          line: "#D9D1C0",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial scale
        "display-2xl": ["clamp(3rem, 6vw + 1rem, 5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 4.5vw + 1rem, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2rem, 3vw + 1rem, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        editorial: "0 1px 0 rgba(26,23,20,0.04), 0 18px 40px -24px rgba(26,23,20,0.18)",
        soft: "0 8px 24px -12px rgba(26,23,20,0.12)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;