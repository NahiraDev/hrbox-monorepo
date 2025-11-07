import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
  content: [
    '../../modules/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../core/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../UIKit/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../stories/**/*.{js,ts,jsx,tsx,d.ts,d.ts.map}',
    '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mjs,mts}',
    '../../index.html',
    '../../main.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'light-mode': `url('/images/lightmode.webp')`,
        'dark-mode': `url('/images/darkmode.webp')`,
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-default)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          150: 'var(--color-primary-150)',
          200: 'var(--color-primary-200)',
          250: 'var(--color-primary-250)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          1000: 'var(--color-primary-1000)',
        },

        secondary: {
          DEFAULT: 'var(--color-secondary-default)',
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          150: 'var(--color-secondary-150)',
          200: 'var(--color-secondary-200)',
          250: 'var(--color-secondary-250)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          1000: 'var(--color-secondary-1000)',
        },

        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          150: 'var(--color-neutral-150)',
          200: 'var(--color-neutral-200)',
          250: 'var(--color-neutral-250)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          1000: 'var(--color-neutral-1000)',
        },

        surface: {
          DEFAULT: 'var(--color-surface-default)',
          50: 'var(--color-surface-50)',
          100: 'var(--color-surface-100)',
          200: 'var(--color-surface-200)',
        },

        white: '#ffffff',
        gold: '#DDBA69',

        success: {
          DEFAULT: 'var(--color-success-default)',
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          900: 'var(--color-success-900)',
        },
        warning: {
          DEFAULT: 'var(--color-warning-default)',
          50: 'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          900: 'var(--color-warning-900)',
        },
        danger: {
          DEFAULT: 'var(--color-danger-default)',
          50: 'var(--color-danger-50)',
          100: 'var(--color-danger-100)',
          900: 'var(--color-danger-900)',
        },
        info: {
          DEFAULT: 'var(--color-info-default)',
          50: 'var(--color-info-50)',
          100: 'var(--color-info-100)',
          900: 'var(--color-info-900)',
          1000: 'var(--color-info-1000)',
        },
        tertiary: {
          DEFAULT: 'var(--color-tertiary-default)',
          100: 'var(--color-tertiary-100)',
          400: 'var(--color-tertiary-400)',
          900: 'var(--color-tertiary-900)',
        },
      },
    },
  },

  plugins: [
    heroui({
      prefix: 'heroui',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      themes: {
        light: {
          colors: {
            default: '#ffffff',
            foreground: '#04070E',
            background: '#F5FBFE',
            info: {
              DEFAULT: '#01101A',
            },
            secondary: {
              DEFAULT: '#1E3363',
              foreground: '#04070E',
            },
            primary: {
              DEFAULT: '#0A9AD7',
              foreground: '#0A9AD7',
            },
          },
        },
        dark: {
          colors: {
            default: '#01101A',
            foreground: '#FFF',
            background: '#01101A',
            info: {
              DEFAULT: '#FFF',
            },
            secondary: {
              DEFAULT: '#FFF',
              foreground: '#FFF',
            },
            primary: {
              DEFAULT: '#044566',
              foreground: '#044566',
            },
          },
        },
      },
    }),
  ],
};

export default config;
