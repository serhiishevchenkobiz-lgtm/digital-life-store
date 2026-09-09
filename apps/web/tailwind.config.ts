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
        DEFAULT: "0.5rem",
        sm: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FFFFFF",
          deep: "#F1F6F8",
          bright: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#083B63",
          soft: "#536D80",
          muted: "#718697",
        },
        accent: {
          DEFAULT: "#159AD1",
          deep: "#0879B3",
          soft: "#8FD3EC",
        },
        muted: {
          DEFAULT: "#E4EEF3",
          line: "#C6D6DF",
        },
        night: {
          DEFAULT: "#262626",
          soft: "#333333",
          light: "#E9F1F5",
        },
        leaf: {
          DEFAULT: "#62A52A",
          pale: "#EAF5DE",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.5rem, 5vw + 1rem, 5.25rem)", { lineHeight: "1.03", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(2.2rem, 4vw + 1rem, 3.8rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.8rem, 2.5vw + 1rem, 2.65rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        sm: "4px",
        md: "7px",
        lg: "10px",
        xl: "14px",
      },
      boxShadow: {
        editorial: "0 1px 0 rgba(8,59,99,.08), 0 8px 20px rgba(8,59,99,.12)",
        soft: "0 4px 14px rgba(8,59,99,.12)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 450ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
