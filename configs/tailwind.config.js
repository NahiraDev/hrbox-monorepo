import { heroui } from '@heroui/react';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    '../modules/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../core/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs,mts}',
    '../modules/**/index.html',
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.65rem',
        'xxl': '1.4rem',
      },
    },
  },
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        fontSize: {
          'xxs': '0.65rem',
          'xxl': '1.4rem',
        },
        light: {
          colors: {
            background: "#FFF",
            foreground: "#04070E",
            white:'#FFF',
            black: '#000000',
            navy_blue: {
              400: '#1E3363',
            },
            info:{
              1000:'#01101A'
            },
            secondary: {
              1000: '#04070E',
            },
            primary: {
              DEFAULT:'#0A9AD7',
              400: '#0A9AD7',
            },
          },
        },
        dark: {
          background: "#04070E",
          foreground: "#FFF",
          white:'#000',
          black: '#FFF',
          colors: {
            white:'#01101A',
            black: '#FFF',
            navy_blue: {
              400: '#044566',
            },
            info:{
              1000:'#FFF'
            },
            secondary: {
              1000: '#FFF',
            },
            primary: {
              DEFAULT:'#0A9AD7',
              400: '#044566',
            },
          },
        },
      },
    }),
  ],
};
