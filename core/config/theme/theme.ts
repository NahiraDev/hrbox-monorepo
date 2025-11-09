import { Panel } from "@core/config/theme/roles";

export type ThemeMode = 'light' | 'dark';
export type PanelType = Panel;

export interface PanelThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  gradient?: string;
}

export const PANEL_THEMES: Record<Panel, Record<ThemeMode, PanelThemeConfig>> = {
  [Panel.HRLINK]: {
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
  [Panel.HRBOX]: {
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
  [Panel.SUPER_ADMIN]: {
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
};