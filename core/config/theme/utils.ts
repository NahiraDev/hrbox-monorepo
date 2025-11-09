import { PanelThemes, type PanelType, type ThemeMode } from './tokens';
import { PANEL_THEMES } from "@core/config/theme/theme";
import { Panel } from "@core/config/theme/roles";

export function applyPanelTheme(panel: Panel, mode: ThemeMode = 'light'): void {
  const root = document.documentElement;
  const theme = PANEL_THEMES[panel][mode];

  // حذف کلاس‌های قبلی
  root.className = root.className
    .replace(/\b(hrlink|hrbox|super-admin|dark|light)\b/g, '')
    .trim();

  // اضافه کردن کلاس‌های جدید
  root.classList.add(panel, mode);

  // تنظیم CSS Variables
  root.style.setProperty('--color-panel-primary', theme.primary);
  root.style.setProperty('--color-panel-secondary', theme.secondary);
  root.style.setProperty('--color-panel-background', theme.background);
  root.style.setProperty('--color-panel-surface', theme.surface);
  root.style.colorScheme = mode;
}
