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
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          colors: {
            background: "#FFF",
            foreground: "#04070E",
            white: '#FFF',
            black: '#000000',

            // Primary colors
            primary: {
              DEFAULT: '#0884B8',
              0: '#DCF0F9',
              100: '#B8E2F3',
              150: '#96D3ED',
              200: '#73C5E8',
              250: '#50B6E2',
              300: '#2DA8DC',
              400: '#0A9AD7',
              500: '#0884B8',
              600: '#076E99',
              700: '#05587A',
              800: '#04425C',
              900: '#022C3D',
              1000: '#01161E',
            },

            // Secondary colors
            secondary: {
              DEFAULT: '#192B54',
              0: '#DEE1E8',
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

            // Neutral colors
            neutral: {
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

            // Info colors
            info: {
              0: '#DCEBF4',
              50: '#B9D7EA',
              150: '#96C4E0',
              200: '#73B0D5',
              250: '#509DCB',
              300: '#2D89C1',
              400: '#0B76B7',
              500: '#09659C',
              600: '#075482',
              700: '#064368',
              800: '#04324E',
              900: '#032134',
              1000: '#01101A',
            },

            // Success colors
            success: {
              0: '#DFF3E7',
              50: '#BFE7D0',
              150: '#A0DBB9',
              200: '#80D0A1',
              250: '#61C48A',
              300: '#41B873',
              400: '#22AD5C',
              500: '#1D944E',
              600: '#187B41',
              700: '#136234',
              800: '#0E4A27',
              900: '#09311A',
              1000: '#04180D',
            },

            // Warning colors
            warning: {
              0: '#FEEFDA',
              100: '#FEDFB6',
              150: '#FECF92',
              200: '#FDBF6E',
              250: '#FDAF4A',
              300: '#FD9F26',
              400: '#FD8F02',
              500: '#D87A01',
              600: '#B46601',
              700: '#905101',
              800: '#6C3D00',
              900: '#482800',
              1000: '#241400',
            },

            // Danger colors
            danger: {
              0: '#FDE1E1',
              50: '#FBC3C3',
              150: '#F9A6A6',
              200: '#F78888',
              250: '#F56B6B',
              300: '#F34D4D',
              400: '#F23030',
              500: '#CF2929',
              600: '#AC2222',
              700: '#8A1B1B',
              800: '#671414',
              900: '#450D0D',
              1000: '#220606',
            },

            // Tertiary colors
            tertiary: {
              0: '#FEDEE6',
              100: '#FEBDCD',
              150: '#FE9DB4',
              200: '#FD7C9B',
              250: '#FD5C82',
              300: '#FD3B69',
              400: '#FD1B51',
              500: '#D81745',
              600: '#B41339',
              700: '#900F2E',
              800: '#6C0B22',
              900: '#480717',
              1000: '#24030B',
            },

            // Surface colors
            surface: {
              0: '#F5FBFE',
              50: '#DCF0F966',
              100: '#04425C66',
              150: '#044566',
            },

            // Gold color
            gold: '#DDBA69',
          },
        },
        dark: {
          colors: {
            background: "#04070E",
            foreground: "#FFF",
            white: '#01101A',
            black: '#FFF',

            // Primary colors (adjusted for dark mode)
            primary: {
              DEFAULT: '#044566',
              0: '#01161E',
              100: '#022C3D',
              150: '#04425C',
              200: '#05587A',
              250: '#076E99',
              300: '#0884B8',
              400: '#044566',
              500: '#0A9AD7',
              600: '#2DA8DC',
              700: '#50B6E2',
              800: '#73C5E8',
              900: '#96D3ED',
              1000: '#DCF0F9',
            },

            // Secondary colors (adjusted for dark mode)
            secondary: {
              DEFAULT: '#080E1C',
              0: '#04070E',
              100: '#080E1C',
              150: '#0C152A',
              200: '#111D38',
              250: '#152446',
              300: '#192B54',
              400: '#1E3363',
              500: '#3E5079',
              600: '#5E6D8F',
              700: '#7E8AA5',
              800: '#9EA7BC',
              900: '#BEC4D2',
              1000: '#DEE1E8',
            },

            // Neutral colors (inverted for dark mode)
            neutral: {
              50: '#090909',
              100: '#111111',
              150: '#222222',
              200: '#333333',
              250: '#444444',
              300: '#555555',
              400: '#666666',
              500: '#7F7F7F',
              600: '#999999',
              700: '#B2B2B2',
              800: '#CCCCCC',
              900: '#E5E5E5',
              1000: '#F6F6F6',
            },

            // Info colors (adjusted for dark mode)
            info: {
              0: '#01101A',
              50: '#032134',
              150: '#04324E',
              200: '#064368',
              250: '#075482',
              300: '#09659C',
              400: '#0B76B7',
              500: '#2D89C1',
              600: '#509DCB',
              700: '#73B0D5',
              800: '#96C4E0',
              900: '#B9D7EA',
              1000: '#DCEBF4',
            },

            // Keep other color scales similar but adjust as needed
            success: {
              0: '#04180D',
              50: '#09311A',
              150: '#0E4A27',
              200: '#136234',
              250: '#187B41',
              300: '#1D944E',
              400: '#22AD5C',
              500: '#41B873',
              600: '#61C48A',
              700: '#80D0A1',
              800: '#A0DBB9',
              900: '#BFE7D0',
              1000: '#DFF3E7',
            },

            warning: {
              0: '#241400',
              100: '#482800',
              150: '#6C3D00',
              200: '#905101',
              250: '#B46601',
              300: '#D87A01',
              400: '#FD8F02',
              500: '#FD9F26',
              600: '#FDAF4A',
              700: '#FDBF6E',
              800: '#FECF92',
              900: '#FEDFB6',
              1000: '#FEEFDA',
            },

            danger: {
              0: '#220606',
              50: '#450D0D',
              150: '#671414',
              200: '#8A1B1B',
              250: '#AC2222',
              300: '#CF2929',
              400: '#F23030',
              500: '#F34D4D',
              600: '#F56B6B',
              700: '#F78888',
              800: '#F9A6A6',
              900: '#FBC3C3',
              1000: '#FDE1E1',
            },

            tertiary: {
              0: '#24030B',
              100: '#480717',
              150: '#6C0B22',
              200: '#900F2E',
              250: '#B41339',
              300: '#D81745',
              400: '#FD1B51',
              500: '#FD3B69',
              600: '#FD5C82',
              700: '#FD7C9B',
              800: '#FE9DB4',
              900: '#FEBDCD',
              1000: '#FEDEE6',
            },

            // Surface colors (adjusted for dark mode)
            surface: {
              0: '#044566',
              50: '#04425C66',
              100: '#DCF0F966',
              150: '#F5FBFE',
            },

            // Gold color
            gold: '#DDBA69',
          },
        },
      },
    }),
  ],
};
