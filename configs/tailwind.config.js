import { heroui } from '@heroui/react';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    '../modules/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../core/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs,mts}',
    '../modules/**/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {

      // Enhanced Background Images
      backgroundImage: {
        'light-mode': `url('../core/assets/img/lightmode-bg.png')`,
        'dark-mode': `url('../core/assets/img/darkmode-bg.png')`,
      },

      // Enhanced Colors - Using static values for Tailwind v4 compatibility
      colors: {
        // Primary colors with static values
        'primary': {
          DEFAULT: '#0A9AD7',
          50: '#B8E2F3',
          100: '#B8E2F3',
          150: '#96D3ED',
          200: '#73C5E8',
          250: '#50B6E2',
          300: '#2DA8DC',
          400: '#2DA8DC',
          500: '#0884B8',
          600: '#076E99',
          700: '#05587A',
          800: '#04425C',
          900: '#022C3D',
          1000: '#01161E',
        },

        'secondary': {
          DEFAULT: '#1E3363',
          50: '#BEC4D2',
          100: '#BEC4D2',
          150: '#9EA7BC',
          200: '#7E8AA5',
          250: '#5E6D8F',
          300: '#3E5079',
          400: '#1E3363',
          500: '#192B54',
          600: '#152446',
          700: '#111D38',
          800: '#0C152A',
          900: '#080E1C',
          1000: '#04070E',
        },

        'neutral': {
          50: '#F6F6F6',
          100: '#E5E5E5',
          150: '#CCCCCC',
          200: '#B2B2B2',
          250: '#999999',
          300: '#7F7F7F',
          400: '#666666',
          500: '#555555',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
          1000: '#090909',
        },

        'surface': {
          DEFAULT: '#F5FBFE',
          50: 'rgba(220, 240, 249, 0.4)',
          100: 'rgba(4, 66, 92, 0.4)',
          200: '#044566',
        },

        'white': '#ffffff',
        'gold': '#DDBA69',

        // Semantic colors
        'success': {
          DEFAULT: '#22AD5C',
          50: '#BFE7D0',
          100: '#BFE7D0',
          900: '#09311A',
        },
        'warning': {
          DEFAULT: '#FEEFDA',
          50: '#FEDFB6',
          100: '#FEDFB6',
          900: '#482800',
        },
        'danger': {
          DEFAULT: '#F23030',
          50: '#FBC3C3',
          100: '#FBC3C3',
          900: '#450D0D',
        },
        'info': {
          DEFAULT: '#DCEBF4',
          50: '#B9D7EA',
          100: '#B9D7EA',
          900: '#032134',
          1000: '#01101A',
        },
        'tertiary': {
          DEFAULT: '#FEDEE6',
          100: '#FEBDCD',
          400: '#FD1B51',
          900: '#480717',
        },
      },
    },
  },

  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          colors: {
            default: '#ffffff',
            foreground: "#04070E",
            background: "#F5FBFE",
            navy_blue: {
              400: '#1E3363',
            },
            info: {
              1000: '#01101A'
            },
            secondary: {
              DEFAULT: '#1E3363',
              1000: '#04070E',
            },
            primary: {
              DEFAULT: '#0A9AD7',
              400: '#0A9AD7',
            },
          },
        },
        dark: {
          colors: {
            default: '#01101A',
            foreground: "#FFF",
            background: "#01101A",
            navy_blue: {
              400: '#044566',
            },
            info: {
              1000: '#FFF'
            },
            secondary: {
              DEFAULT: '#FFF',
              1000: '#FFF',
            },
            primary: {
              DEFAULT: '#044566',
              400: '#044566',
            },
          },
        },
      },
    }),
  ],
};
