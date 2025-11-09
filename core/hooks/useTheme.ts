import { useAppSelector, useAppDispatch } from '@hrbox/core/redux/hooks';
import {
  setThemeMode,
  toggleTheme,
  setCurrentPanel,
  initTheme,
} from '@hrbox/core/redux/slices/themeSlice';
import type { ThemeMode, Panel } from '@hrbox/core/config/theme';

export function useTheme() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state:any) => state.theme.mode);
  const currentPanel = useAppSelector((state:any) => state.theme.currentPanel);
  const isInitialized = useAppSelector((state:any) => state.theme.isInitialized);

  return {
    mode,
    currentPanel,
    isDark: mode === 'dark',
    isLight: mode === 'light',
    isInitialized,

    setMode: (mode: ThemeMode) => dispatch(setThemeMode(mode)),
    toggle: () => dispatch(toggleTheme()),
    setPanel: (panel: Panel | null) => dispatch(setCurrentPanel(panel)),
    init: () => dispatch(initTheme()),
  };
}