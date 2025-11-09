import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeEngine } from '@core/theme/engine';
import type { ThemeConfig, ThemeMode, Panel } from '@core/theme/types';

// ============================================
// State Interface
// ============================================

interface AdvancedThemeState {
  mode: ThemeMode;
  panel: Panel | null;
  config: ThemeConfig | null;
  isInitialized: boolean;
  isCustomized: boolean;
  history: ThemeConfig[];
  historyIndex: number;
}

// ============================================
// Initial State
// ============================================

const initialState: AdvancedThemeState = {
  mode: 'light',
  panel: null,
  config: null,
  isInitialized: false,
  isCustomized: false,
  history: [],
  historyIndex: -1,
};

// ============================================
// Slice
// ============================================

export const advancedThemeSlice = createSlice({
  name: 'advancedTheme',
  initialState,
  reducers: {
    /**
     * 🔹 مقداردهی اولیه تم
     */
    initTheme: (state) => {
      // بارگذاری از localStorage
      const savedTheme = themeEngine.loadTheme();

      if (savedTheme) {
        state.mode = savedTheme.mode;
        state.panel = savedTheme.panel;
        state.config = savedTheme;
        state.isCustomized = true;
      } else {
        // تم پیش‌فرض بر اساس سیستم
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.mode = systemPrefersDark ? 'dark' : 'light';
        state.panel = 'hrbox';

        themeEngine.resetToDefault(state.panel, state.mode);
        state.config = themeEngine.getCurrentTheme();
      }

      state.isInitialized = true;
      state.history = [state.config!];
      state.historyIndex = 0;
    },

    /**
     * 🔹 تغییر مد (light/dark)
     */
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';

      themeEngine.toggleMode();
      state.config = themeEngine.getCurrentTheme();

      // اضافه به تاریخچه
      state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
      state.historyIndex += 1;
    },

    /**
     * 🔹 تنظیم مد مشخص
     */
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;

      if (state.config) {
        themeEngine.applyTheme({ ...state.config, mode: action.payload });
        state.config = themeEngine.getCurrentTheme();

        // اضافه به تاریخچه
        state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
        state.historyIndex += 1;
      }
    },

    /**
     * 🔹 تغییر پنل
     */
    changePanel: (state, action: PayloadAction<Panel>) => {
      state.panel = action.payload;

      themeEngine.changePanel(action.payload);
      state.config = themeEngine.getCurrentTheme();

      // اضافه به تاریخچه
      state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
      state.historyIndex += 1;
    },

    /**
     * 🔹 اعمال تم کامل
     */
    applyFullTheme: (state, action: PayloadAction<Partial<ThemeConfig>>) => {
      themeEngine.applyTheme(action.payload);

      const newTheme = themeEngine.getCurrentTheme();
      state.config = newTheme;
      state.mode = newTheme!.mode;
      state.panel = newTheme!.panel;
      state.isCustomized = true;

      // اضافه به تاریخچه
      state.history = [...state.history.slice(0, state.historyIndex + 1), newTheme!];
      state.historyIndex += 1;
    },

    /**
     * 🔹 به‌روزرسانی رنگ خاص
     */
    updateColor: (
      state,
      action: PayloadAction<{ path: string; value: string }>
    ) => {
      const { path, value } = action.payload;
      themeEngine.updateColor(path, value);

      state.config = themeEngine.getCurrentTheme();
      state.isCustomized = true;

      // اضافه به تاریخچه
      state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
      state.historyIndex += 1;
    },

    /**
     * 🔹 به‌روزرسانی فونت
     */
    updateFont: (
      state,
      action: PayloadAction<{ type: 'display' | 'body' | 'mono'; value: string }>
    ) => {
      const { type, value } = action.payload;
      themeEngine.updateFont(type, value);

      state.config = themeEngine.getCurrentTheme();
      state.isCustomized = true;

      // اضافه به تاریخچه
      state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
      state.historyIndex += 1;
    },

    /**
     * 🔹 به‌روزرسانی Spacing
     */
    updateSpacing: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;

      if (state.config) {
        (state.config.spacing as any)[key] = value;
        themeEngine.applyTheme(state.config);
        state.config = themeEngine.getCurrentTheme();
        state.isCustomized = true;

        // اضافه به تاریخچه
        state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
        state.historyIndex += 1;
      }
    },

    /**
     * 🔹 به‌روزرسانی Border Radius
     */
    updateRadius: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;

      if (state.config) {
        (state.config.radius as any)[key] = value;
        themeEngine.applyTheme(state.config);
        state.config = themeEngine.getCurrentTheme();
        state.isCustomized = true;

        // اضافه به تاریخچه
        state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
        state.historyIndex += 1;
      }
    },

    /**
     * 🔹 اضافه کردن CSS سفارشی
     */
    addCustomCSS: (state, action: PayloadAction<string>) => {
      if (state.config) {
        state.config.customCSS = action.payload;
        themeEngine.applyTheme(state.config);
        state.config = themeEngine.getCurrentTheme();
        state.isCustomized = true;

        // اضافه به تاریخچه
        state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
        state.historyIndex += 1;
      }
    },

    /**
     * 🔹 ریست به تم پیش‌فرض
     */
    resetToDefault: (state) => {
      if (state.panel) {
        themeEngine.resetToDefault(state.panel, state.mode);
        state.config = themeEngine.getCurrentTheme();
        state.isCustomized = false;

        // اضافه به تاریخچه
        state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
        state.historyIndex += 1;
      }
    },

    /**
     * 🔹 Undo (بازگشت به تم قبلی)
     */
    undoTheme: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        const previousTheme = state.history[state.historyIndex];

        themeEngine.applyTheme(previousTheme);
        state.config = previousTheme;
        state.mode = previousTheme.mode;
        state.panel = previousTheme.panel;
      }
    },

    /**
     * 🔹 Redo (بازگشت به تم بعدی)
     */
    redoTheme: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        const nextTheme = state.history[state.historyIndex];

        themeEngine.applyTheme(nextTheme);
        state.config = nextTheme;
        state.mode = nextTheme.mode;
        state.panel = nextTheme.panel;
      }
    },

    /**
     * 🔹 ایمپورت تم از JSON
     */
    importTheme: (state, action: PayloadAction<string>) => {
      const success = themeEngine.importTheme(action.payload);

      if (success) {
        const newTheme = themeEngine.getCurrentTheme();
        state.config = newTheme;
        state.mode = newTheme!.mode;
        state.panel = newTheme!.panel;
        state.isCustomized = true;

        // ریست تاریخچه
        state.history = [newTheme!];
        state.historyIndex = 0;
      }
    },

    /**
     * 🔹 پاک کردن تاریخچه
     */
    clearHistory: (state) => {
      if (state.config) {
        state.history = [state.config];
        state.historyIndex = 0;
      }
    },
  },
});

export const {
  initTheme,
  toggleThemeMode,
  setThemeMode,
  changePanel,
  applyFullTheme,
  updateColor,
  updateFont,
  updateSpacing,
  updateRadius,
  addCustomCSS,
  resetToDefault,
  undoTheme,
  redoTheme,
  importTheme,
  clearHistory,
} = advancedThemeSlice.actions;

export const selectThemeMode = (state: any) => state.advancedTheme.mode;
export const selectThemePanel = (state: any) => state.advancedTheme.panel;
export const selectThemeConfig = (state: any) => state.advancedTheme.config;
export const selectIsThemeInitialized = (state: any) => state.advancedTheme.isInitialized;
export const selectIsThemeCustomized = (state: any) => state.advancedTheme.isCustomized;
export const selectCanUndo = (state: any) => state.advancedTheme.historyIndex > 0;
export const selectCanRedo = (state: any) =>
  state.advancedTheme.historyIndex < state.advancedTheme.history.length - 1;

export default advancedThemeSlice.reducer;