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
      borderRadius:{
        'xs': '4px'
      },
      backgroundImage: {
        'light-mode-bg': `url('../core/assets/img/lightmode-bg.png')`,
        'dark-mode-bg': `url('../core/assets/img/darkmode-bg.png')`,
      }
    }
  },
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        borderRadius:{
          'xs': '4px'
        },
        light: {
          colors: {
            foreground: "#04070E",
            background: "#F5FBFE",
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
          colors: {
            foreground: "#FFF",
            background: "#01101A",
            navy_blue: {
              400: '#044566',
            },
            info:{
              1000:'#FFF'
            },
            secondary: {
              DEFAULT:'#FFF',
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
