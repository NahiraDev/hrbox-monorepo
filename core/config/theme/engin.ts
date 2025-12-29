import {
  Panel,
  RadiusConfig,
  ShadowConfig,
  SpacingConfig,
  ThemeColors,
  ThemeConfig,
  ThemeMode,
  TypographyConfig
} from "@hrbox/core/config/theme/types";
import {
  DEFAULT_COLORS,
  DEFAULT_RADIUS,
  DEFAULT_SHADOWS,
  DEFAULT_SPACING,
  DEFAULT_TYPOGRAPHY,
  PANEL_PRESETS
} from "@hrbox/core/config/theme/presets";

export class ThemeEngine {
  private root: HTMLElement;
  private currentTheme: ThemeConfig | null = null;

  constructor() {
    this.root = document.documentElement;
  }

  applyTheme(theme: Partial<ThemeConfig>): void {
    const fullTheme: any = this.mergeWithDefaults(theme);
    this.currentTheme = fullTheme;

    this.root.className = this.root.className
      .replace(/\b(hrlink|hrbox|dark|light)\b/g, "")
      .trim();

    this.root.classList.add(fullTheme.panel, fullTheme.mode);
    this.root.style.colorScheme = fullTheme.mode;

    this.applyColors(fullTheme);

    this.applyTypography(fullTheme.typography);

    this.applySpacing(fullTheme.spacing);

    this.applyRadius(fullTheme.radius);

    this.applyShadows(fullTheme.shadows);

    if (fullTheme.customCSS) {
      this.applyCustomCSS(fullTheme.customCSS);
    }

    this.saveTheme(fullTheme);
  }

  private applyColors(theme: ThemeConfig): void {
    const panelColors = PANEL_PRESETS[theme.panel][theme.mode];

    this.setVariable("--color-primary", panelColors.primary);
    this.setVariable("--color-secondary", panelColors.secondary);
    this.setVariable("--color-background", panelColors.background);
    this.setVariable("--color-surface", panelColors.surface);

    Object.entries(theme.colors.primary).forEach(([key, value]) => {
      this.setVariable(`--color-primary-${key}`, value);
    });

    Object.entries(theme.colors.secondary).forEach(([key, value]) => {
      this.setVariable(`--color-secondary-${key}`, value);
    });

    Object.entries(theme.colors.neutral).forEach(([key, value]) => {
      this.setVariable(`--color-neutral-${key}`, value);
    });

    ["success", "warning", "danger", "info"].forEach((type) => {
      const colors = theme.colors[type as keyof ThemeColors] as Record<number, string>;
      Object.entries(colors).forEach(([key, value]) => {
        this.setVariable(`--color-${type}-${key}`, value);
      });
    });
  }

  private applyTypography(typography: TypographyConfig): void {
    // Font Families
    Object.entries(typography.fontFamily).forEach(([key, value]) => {
      this.setVariable(`--font-${key}`, value);
    });

    Object.entries(typography.fontSize).forEach(([key, value]) => {
      this.setVariable(`--text-${key}`, value);
    });
  }

  private applySpacing(spacing: SpacingConfig): void {
    Object.entries(spacing).forEach(([key, value]) => {
      this.setVariable(`--spacing-${key}`, value);
    });
  }

  private applyRadius(radius: RadiusConfig): void {
    Object.entries(radius).forEach(([key, value]) => {
      this.setVariable(`--radius-${key}`, value);
    });
  }

  private applyShadows(shadows: ShadowConfig): void {
    Object.entries(shadows).forEach(([key, value]) => {
      this.setVariable(`--shadow-${key}`, value);
    });
  }

  private applyCustomCSS(css: string): void {
    let styleElement = document.getElementById("custom-theme-css");

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "custom-theme-css";
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }

  private setVariable(name: string, value: string): void {
    this.root.style.setProperty(name, value);
  }

  private mergeWithDefaults(theme: Partial<ThemeConfig>): ThemeConfig {
    return {
      mode: theme.mode,
      panel: theme.panel,
      colors: {
        primary: { ...DEFAULT_COLORS.primary, ...theme.colors?.primary },
        secondary: { ...DEFAULT_COLORS.secondary, ...theme.colors?.secondary },
        neutral: { ...DEFAULT_COLORS.neutral, ...theme.colors?.neutral },
        success: { ...DEFAULT_COLORS.success, ...theme.colors?.success },
        warning: { ...DEFAULT_COLORS.warning, ...theme.colors?.warning },
        danger: { ...DEFAULT_COLORS.danger, ...theme.colors?.danger },
        info: { ...DEFAULT_COLORS.info, ...theme.colors?.info }
      },
      typography: theme.typography || DEFAULT_TYPOGRAPHY,
      spacing: theme.spacing || DEFAULT_SPACING,
      radius: theme.radius || DEFAULT_RADIUS,
      shadows: theme.shadows || DEFAULT_SHADOWS,
      customCSS: theme.customCSS
    };
  }

  private saveTheme(theme: ThemeConfig): void {
    try {
      localStorage.setItem("app-theme", JSON.stringify(theme));
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  }


  loadTheme(): ThemeConfig | null {
    try {
      const saved = localStorage.getItem("app-theme");
      if (saved) {
        const theme = JSON.parse(saved);
        this.applyTheme(theme);
        return theme;
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
    }
    return null;
  }

  getCurrentTheme(): ThemeConfig | null {
    return this.currentTheme;
  }

  resetToDefault(panel: Panel, mode: ThemeMode): void {
    const defaultTheme: ThemeConfig = {
      mode,
      panel,
      colors: DEFAULT_COLORS,
      typography: DEFAULT_TYPOGRAPHY,
      spacing: DEFAULT_SPACING,
      radius: DEFAULT_RADIUS,
      shadows: DEFAULT_SHADOWS
    };

    this.applyTheme(defaultTheme);
  }

  toggleMode(): void {
    if (!this.currentTheme) return;

    const newMode = this.currentTheme.mode === "light" ? "dark" : "light";
    this.applyTheme({ ...this.currentTheme, mode: newMode });
  }

  changePanel(panel: Panel): void {
    if (!this.currentTheme) return;

    this.applyTheme({ ...this.currentTheme, panel });
  }

  updateColor(path: string, value: string): void {
    if (!this.currentTheme) return;

    const parts = path.split(".");
    const colorType = parts[0] as keyof ThemeColors;
    const shade = parts[1];

    if (this.currentTheme.colors[colorType]) {
      (this.currentTheme.colors[colorType] as any)[shade] = value;
      this.applyTheme(this.currentTheme);
    }
  }

  updateFont(type: keyof TypographyConfig["fontFamily"], value: string): void {
    if (!this.currentTheme) return;

    this.currentTheme.typography.fontFamily[type] = value;
    this.applyTheme(this.currentTheme);
  }
}

export const themeEngine = new ThemeEngine();