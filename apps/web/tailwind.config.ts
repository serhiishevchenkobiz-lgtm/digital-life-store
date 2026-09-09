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
          DEFAULT: "#F7F5F0",
          deep: "#EAE7DE",
          bright: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#14211F",
          soft: "#40504B",
          muted: "#71807B",
        },
        accent: {
          DEFAULT: "#E46B3C",
          deep: "#B94E26",
          soft: "#F2A27E",
        },
        muted: {
          DEFAULT: "#DFE3D8",
          line: "#CDD5CA",
        },
        night: {
          DEFAULT: "#102420",
          soft: "#1C3730",
          light: "#DDE7DF",
        },
        leaf: {
          DEFAULT: "#6B895E",
          pale: "#D8E1D1",
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
        editorial: "0 1px 0 rgba(16,36,32,0.08), 0 22px 46px -28px rgba(16,36,32,0.32)",
        soft: "0 10px 26px -16px rgba(16,36,32,0.28)",
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
