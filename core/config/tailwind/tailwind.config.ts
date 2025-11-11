import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
  content: [
    '../../../modules/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../../core/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../../UIKit/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../../stories/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs,mts}',
  ],
  darkMode: 'class',

  plugins: [
    heroui({
      prefix: 'heroui',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#0A9AD7',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#1E3363',
              foreground: '#FFFFFF',
            },
            background: '#F5FBFE',
            foreground: '#04070E',
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#044566',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#FFFFFF',
              foreground: '#04070E',
            },
            background: '#01101A',
            foreground: '#FFFFFF',
          },
        },
      },
    }),
  ],
};

export default config;
