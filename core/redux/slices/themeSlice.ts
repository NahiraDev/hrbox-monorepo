import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Panel, ThemeMode, applyPanelTheme } from '@core/config/theme';

interface ThemeState {
  mode: ThemeMode;
  currentPanel: Panel | null;
  isInitialized: boolean;
}

const initialState: ThemeState = {
  mode: 'light',
  currentPanel: null,
  isInitialized: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // تبدیل تم
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (state.currentPanel) {
        applyPanelTheme(state.currentPanel, state.mode);
      }
      localStorage.setItem('theme-mode', state.mode);
    },

    // تنظیم مود تم
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (state.currentPanel) {
        applyPanelTheme(state.currentPanel, action.payload);
      }
      localStorage.setItem('theme-mode', action.payload);
    },

    // تنظیم پنل جاری
    setCurrentPanel: (state, action: PayloadAction<Panel | null>) => {
      state.currentPanel = action.payload;
      if (action.payload) {
        applyPanelTheme(action.payload, state.mode);
      }
    },

    // بارگذاری تم
    initTheme: (state) => {
      const savedMode = (localStorage.getItem('theme-mode') as ThemeMode) || 'light';
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      state.mode = savedMode || (systemPrefersDark ? 'dark' : 'light');
      state.isInitialized = true;

      if (state.currentPanel) {
        applyPanelTheme(state.currentPanel, state.mode);
      }
    },
  },
});

export const { toggleTheme, setThemeMode, setCurrentPanel, initTheme } = themeSlice.actions;
export default themeSlice.reducer;