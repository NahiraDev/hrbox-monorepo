import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "../../../modules/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}",
    "../../../core/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}",
    "../../../UIKit/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}",
    "../../../stories/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}",
    "../../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs,mts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        panel: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          background: "var(--color-background)",
          surface: "var(--color-surface)",
        },
        primary: {
          DEFAULT: "#0A9AD7",
          400: "#0A9AD7",
        },
        secondary: {
          DEFAULT: "#0A9AD7",
          400: "#0A9AD7",
        },

        // Super Admin Theme Colors
        admin: {
          primary: {
            light: "#EF4444",
            dark: "#F87171",
          },
          secondary: {
            light: "#991B1B",
            dark: "#FFFFFF",
          },
          background: {
            light: "#FEF2F2",
            dark: "#1F1917",
          },
          surface: {
            light: "#FFFFFF",
            dark: "#292524",
          },
        },

        // Neutral colors (keep standard grays)
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },

      backgroundImage: {
        "login-light": "url('/images/login-bg-light.webp')",
        "login-dark": "url('/images/login-bg-dark.webp')",
        "panel-light": "url('/images/panel-bg-light.webp')",
        "panel-dark": "url('/images/panel-bg-dark.webp')",
      },

      boxShadow: {
        "light-tight-1": "0 1px 3px 0 rgba(8, 14, 28, 0.30)",
      },
    },
  },
  plugins: [
    // Disable HeroUI colors completely
    heroui({
      themes: {
        light: {
          colors: {},
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
};

export default config;
