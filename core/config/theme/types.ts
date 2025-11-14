export type ThemeMode = 'light' | 'dark' | undefined;
export type Panel = 'hrlink' | 'hrbox' | 'super-admin';

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

export interface ThemeColors {
  primary: Record<number, string>;
  secondary: Record<number, string>;
  neutral: Record<number, string>;
  success: Record<number, string>;
  warning: Record<number, string>;
  danger: Record<number, string>;
  info: Record<number, string>;
}

export interface TypographyConfig {
  fontFamily: {
    display: string;
    body: string;
    mono: string;
  };
  fontSize: Record<string, string>;
}

export interface SpacingConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface RadiusConfig {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface ShadowConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  panel: Panel;
  colors: ThemeColors;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  radius: RadiusConfig;
  shadows: ShadowConfig;
  customCSS?: string;
}

export interface PanelTheme {
  light: ColorPalette;
  dark: ColorPalette;
}
