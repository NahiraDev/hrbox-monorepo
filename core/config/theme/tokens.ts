export const DesignTokens = {
  // === Colors ===
  colors: {
    // Primary
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

    // Secondary
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

    // Neutral
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

    // Semantic
    success: {
      DEFAULT: 'var(--color-success)',
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

    // Panel-specific (dynamic)
    panel: {
      primary: 'var(--color-panel-primary)',
      secondary: 'var(--color-panel-secondary)',
      background: 'var(--color-panel-background)',
      surface: 'var(--color-panel-surface)',
    },

    // Special
    white: 'var(--color-white)',
    black: 'var(--color-black)',
    gold: 'var(--color-gold)',
  },

  // === Spacing ===
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
  },

  // === Border Radius ===
  radius: {
    none: 'var(--radius-none)',
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    '3xl': 'var(--radius-3xl)',
    full: 'var(--radius-full)',
  },

  // === Shadows ===
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
    '2xl': 'var(--shadow-2xl)',
  },

  // === Typography ===
  typography: {
    fontFamily: {
      display: 'var(--font-display)',
      body: 'var(--font-body)',
      mono: 'var(--font-mono)',
    },
    fontSize: {
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      base: 'var(--text-base)',
      lg: 'var(--text-lg)',
      xl: 'var(--text-xl)',
      '2xl': 'var(--text-2xl)',
      '3xl': 'var(--text-3xl)',
      '4xl': 'var(--text-4xl)',
      '5xl': 'var(--text-5xl)',
    },
  },
} as const;

// === Panel Themes ===
export const PanelThemes = {
  hrlink: {
    light: {
      primary: '#0A9AD7',
      secondary: '#1E3363',
      background: '#F5FBFE',
      surface: '#FFFFFF',
      gradient: 'from-blue-500 to-cyan-500',
    },
    dark: {
      primary: '#044566',
      secondary: '#FFFFFF',
      background: '#04070E',
      surface: '#01101A',
      gradient: 'from-blue-900 to-cyan-900',
    },
  },
  hrbox: {
    light: {
      primary: '#6366F1',
      secondary: '#1E293B',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      gradient: 'from-purple-500 to-indigo-500',
    },
    dark: {
      primary: '#818CF8',
      secondary: '#FFFFFF',
      background: '#0F172A',
      surface: '#1E293B',
      gradient: 'from-purple-900 to-indigo-900',
    },
  },
  'super-admin': {
    light: {
      primary: '#EF4444',
      secondary: '#991B1B',
      background: '#FEF2F2',
      surface: '#FFFFFF',
      gradient: 'from-red-500 to-orange-500',
    },
    dark: {
      primary: '#F87171',
      secondary: '#FFFFFF',
      background: '#1F1917',
      surface: '#292524',
      gradient: 'from-red-900 to-orange-900',
    },
  },
} as const;

// === Helper Functions ===
export const getTokenValue = (token: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
};

export const setTokenValue = (token: string, value: string): void => {
  if (typeof window === 'undefined') return;
  document.documentElement.style.setProperty(token, value);
};

// === Type Exports ===
export type PanelType = keyof typeof PanelThemes;
export type ThemeMode = 'light' | 'dark';