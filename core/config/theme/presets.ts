import {
  Panel,
  PanelTheme,
  RadiusConfig,
  ShadowConfig,
  SpacingConfig,
  ThemeColors,
  TypographyConfig
} from "@hrbox/core/config/theme/types";

export const PANEL_PRESETS: Record<Panel, PanelTheme> = {
  hrlink: {
    light: {
      primary: "#0A9AD7",
      secondary: "#1E3363",
      background: "#F5FBFE",
      surface: "#FFFFFF",
      text: "#04070E",
      border: "#E5E5E5"
    },
    dark: {
      primary: "#044566",
      secondary: "#FFFFFF",
      background: "#04070E",
      surface: "#01101A",
      text: "#FFFFFF",
      border: "#333333"
    }
  },
  hrbox: {
    light: {
      primary: "#0A9AD7",
      secondary: "#1E293B",
      background: "#F8FAFC",
      surface: "#FFFFFF",
      text: "#0F172A",
      border: "#E2E8F0"
    },
    dark: {
      primary: "#044566",
      secondary: "#FFFFFF",
      background: "#0F172A",
      surface: "#1E293B",
      text: "#F1F5F9",
      border: "#334155"
    }
  }
};

export const DEFAULT_COLORS: ThemeColors = {
  primary: {
    50: "#B8E2F3",
    100: "#B8E2F3",
    150: "#96D3ED",
    200: "#73C5E8",
    250: "#50B6E2",
    300: "#2DA8DC",
    400: "#2DA8DC",
    500: "#0884B8",
    600: "#076E99",
    700: "#05587A",
    800: "#04425C",
    900: "#022C3D",
    1000: "#01161E"
  },
  secondary: {
    50: "#BEC4D2",
    100: "#BEC4D2",
    150: "#9EA7BC",
    200: "#7E8AA5",
    250: "#5E6D8F",
    300: "#3E5079",
    400: "#1E3363",
    500: "#192B54",
    600: "#152446",
    700: "#111D38",
    800: "#0C152A",
    900: "#080E1C",
    1000: "#04070E"
  },
  neutral: {
    50: "#F6F6F6",
    100: "#E5E5E5",
    150: "#CCCCCC",
    200: "#B2B2B2",
    250: "#999999",
    300: "#7F7F7F",
    400: "#666666",
    500: "#555555",
    600: "#444444",
    700: "#333333",
    800: "#222222",
    900: "#111111",
    1000: "#090909"
  },
  success: {
    50: "#BFE7D0",
    100: "#BFE7D0",
    150: "#A0DBB9",
    900: "#09311A"
  },
  warning: {
    50: "#FEDFB6",
    100: "#FEDFB6",
    900: "#482800"
  },
  danger: {
    50: "#FBC3C3",
    100: "#FBC3C3",
    900: "#450D0D"
  },
  info: {
    50: "#B9D7EA",
    100: "#B9D7EA",
    900: "#032134",
    1000: "#01101A"
  }
};

export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fontFamily: {
    display: "'Yekan Bakh', 'sans-serif'",
    body: "'Inter', 'sans-serif'",
    mono: "'Fira Code', 'monospace'"
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem"
  }
};

export const DEFAULT_SPACING: SpacingConfig = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px"
};

export const DEFAULT_RADIUS: RadiusConfig = {
  none: "0",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px"
};

export const DEFAULT_SHADOWS: ShadowConfig = {
  sm: "0px 1px 3px 0px rgba(8, 14, 28, 0.3)",
  md: "0px 2px 6px 0px rgba(8, 14, 28, 0.22)",
  lg: "0px 3px 12px 0px rgba(8, 14, 28, 0.2)",
  xl: "0px 7px 18px 0px rgba(8, 14, 28, 0.17)",
  "2xl": "0px 12px 28px 0px rgba(8, 14, 28, 0.2)"
};