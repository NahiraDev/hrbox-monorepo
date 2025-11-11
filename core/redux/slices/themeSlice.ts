import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themeEngine } from "@hrbox/core/config/theme/engin";
import { Panel, PanelTheme, ThemeConfig, ThemeMode } from "@hrbox/core/config/theme/types";
import { RootState } from "@reduxjs/toolkit/query";

// ============================================
// State Interface
// ============================================

interface AdvancedThemeState {
  mode: ThemeMode;
  panel: Panel;
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
  panel: 'hrlink',
  config: null,
  isInitialized: false,
  isCustomized: false,
  history: [],
  historyIndex: -1,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    initTheme: (state) => {
      const savedTheme = themeEngine.loadTheme();

      if (savedTheme) {
        state.mode = savedTheme.mode;
        state.panel = savedTheme.panel;
        state.config = savedTheme;
        state.isCustomized = true;
      } else {
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

    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';

      themeEngine.toggleMode();
      state.config = themeEngine.getCurrentTheme();

      // اضافه به تاریخچه
      state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
      state.historyIndex += 1;
    },

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

    changePanel: (state, action: PayloadAction<Panel>) => {
      state.panel = action.payload;

      themeEngine.changePanel(action.payload);
      state.config = themeEngine.getCurrentTheme();

      // اضافه به تاریخچه
      state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
      state.historyIndex += 1;
    },


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

    updateColor: (
      state,
      action: PayloadAction<{ path: string; value: string }>
    ) => {
      const { path, value } = action.payload;
      themeEngine.updateColor(path, value);

      state.config = themeEngine.getCurrentTheme();
      state.isCustomized = true;

      state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
      state.historyIndex += 1;
    },

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

        state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
        state.historyIndex += 1;
      }
    },

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
        state.history = [...state.history.slice(0, state.historyIndex + 1), state.config!];
        state.historyIndex += 1;
      }
    },

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
  resetToDefault,
  clearHistory,
} = themeSlice.actions;

export const selectThemeMode = (state: any) => state.theme.mode;
export const selectThemePanel = (state: any) => state.theme.panel;
export const selectThemeConfig = (state: any) => state.theme.config;
export const selectIsThemeInitialized = (state: any) => state.theme.isInitialized;
export const selectIsThemeCustomized = (state: any) => state.theme.isCustomized;
export const selectCanUndo = (state: any) => state.theme.historyIndex > 0;
export const selectCanRedo = (state: any) =>
  state.theme.historyIndex < state.theme.history.length - 1;

export default themeSlice.reducer;