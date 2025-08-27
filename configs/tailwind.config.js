import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../modules/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../core/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs,mts}',
    '../modules/**/index.html',
  ],
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "hrbox", // prefix for themes variables
      addCommonColors: true,
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {
        radius: {
          small: '4px',
          medium: '6px',
          large: '8px',
        },
      },
      themes: {
        light: {
          colors: {
            black: '#000000',
            navy_blue: {
              400: '#1E3363',
            },
            secondary: {
              1000: '#04070E',
            },
            primary: {
              400: '#0A9AD7',
            },
          },
        },
        dark: {
          colors: {
            black: '#fff',
            navy_blue: {
              400: '#044566',
            },
            secondary: {
              1000: '#FFF',
            },
            primary: {
              400: '#044566',
            },
          },
        },
      },
    }),
  ],
};
