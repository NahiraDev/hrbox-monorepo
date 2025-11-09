import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@core/redux/hooks';
import { themeEngine } from '@core/theme/engine';
import {
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
  selectThemeMode,
  selectThemePanel,
  selectThemeConfig,
  selectIsThemeInitialized,
  selectIsThemeCustomized,
  selectCanUndo,
  selectCanRedo,
} from '@core/redux/slices/advancedThemeSlice';
import type { ThemeMode, Panel, ThemeConfig } from '@hrbox/core/config/theme/types';

// ============================================
// Hook Interface
// ============================================

interface UseAdvancedThemeReturn {
  // State
  mode: ThemeMode;
  panel: Panel | null;
  config: ThemeConfig | null;
  isInitialized: boolean;
  isCustomized: boolean;
  isDark: boolean;
  canUndo: boolean;
  canRedo: boolean;

  // Theme Mode
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;

  // Panel
  setPanel: (panel: Panel) => void;

  // Full Theme
  applyTheme: (theme: Partial<ThemeConfig>) => void;

  // Colors
  setColor: (path: string, value: string) => void;
  getColor: (path: string) => string | undefined;

  // Typography
  setFont: (type: 'display' | 'body' | 'mono', value: string) => void;
  getFont: (type: 'display' | 'body' | 'mono') => string | undefined;

  // Spacing
  setSpacing: (key: string, value: string) => void;
  getSpacing: (key: string) => string | undefined;

  // Border Radius
  setRadius: (key: string, value: string) => void;
  getRadius: (key: string) => string | undefined;

  // Custom CSS
  setCustomCSS: (css: string) => void;

  // Reset & History
  reset: () => void;
  undo: () => void;
  redo: () => void;
  clearThemeHistory: () => void;

  // Import/Export
  exportTheme: () => string;
  importThemeFromJSON: (json: string) => void;
}

// ============================================
// Main Hook
// ============================================

export function useTheme(): UseAdvancedThemeReturn {
  const dispatch = useAppDispatch();

  // Selectors
  const mode = useAppSelector(selectThemeMode);
  const panel = useAppSelector(selectThemePanel);
  const config = useAppSelector(selectThemeConfig);
  const isInitialized = useAppSelector(selectIsThemeInitialized);
  const isCustomized = useAppSelector(selectIsThemeCustomized);
  const canUndo = useAppSelector(selectCanUndo);
  const canRedo = useAppSelector(selectCanRedo);

  const isDark = useMemo(() => mode === 'dark', [mode]);

  // ============================================
  // Theme Mode
  // ============================================

  const toggleMode = useCallback(() => {
    dispatch(toggleThemeMode());
  }, [dispatch]);

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      dispatch(setThemeMode(newMode));
    },
    [dispatch]
  );

  // ============================================
  // Panel
  // ============================================

  const setPanel = useCallback(
    (newPanel: Panel) => {
      dispatch(changePanel(newPanel));
    },
    [dispatch]
  );

  // ============================================
  // Full Theme
  // ============================================

  const applyTheme = useCallback(
    (theme: Partial<ThemeConfig>) => {
      dispatch(applyFullTheme(theme));
    },
    [dispatch]
  );

  // ============================================
  // Colors
  // ============================================

  const setColor = useCallback(
    (path: string, value: string) => {
      dispatch(updateColor({ path, value }));
    },
    [dispatch]
  );

  const getColor = useCallback(
    (path: string): string | undefined => {
      if (!config) return undefined;

      const parts = path.split('.');
      let current: any = config.colors;

      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return undefined;
        }
      }

      return current as string;
    },
    [config]
  );

  // ============================================
  // Typography
  // ============================================

  const setFont = useCallback(
    (type: 'display' | 'body' | 'mono', value: string) => {
      dispatch(updateFont({ type, value }));
    },
    [dispatch]
  );

  const getFont = useCallback(
    (type: 'display' | 'body' | 'mono'): string | undefined => {
      return config?.typography.fontFamily[type];
    },
    [config]
  );

  // ============================================
  // Spacing
  // ============================================

  const setSpacing = useCallback(
    (key: string, value: string) => {
      dispatch(updateSpacing({ key, value }));
    },
    [dispatch]
  );

  const getSpacing = useCallback(
    (key: string): string | undefined => {
      return (config?.spacing as any)?.[key];
    },
    [config]
  );

  // ============================================
  // Border Radius
  // ============================================

  const setRadius = useCallback(
    (key: string, value: string) => {
      dispatch(updateRadius({ key, value }));
    },
    [dispatch]
  );

  const getRadius = useCallback(
    (key: string): string | undefined => {
      return (config?.radius as any)?.[key];
    },
    [config]
  );

  // ============================================
  // Custom CSS
  // ============================================

  const setCustomCSS = useCallback(
    (css: string) => {
      dispatch(addCustomCSS(css));
    },
    [dispatch]
  );

  // ============================================
  // Reset & History
  // ============================================

  const reset = useCallback(() => {
    dispatch(resetToDefault());
  }, [dispatch]);

  const undo = useCallback(() => {
    dispatch(undoTheme());
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch(redoTheme());
  }, [dispatch]);

  const clearThemeHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  // ============================================
  // Import/Export
  // ============================================

  const exportTheme = useCallback((): string => {
    return themeEngine.exportTheme();
  }, []);

  const importThemeFromJSON = useCallback(
    (json: string) => {
      dispatch(importTheme(json));
    },
    [dispatch]
  );

  // ============================================
  // Return
  // ============================================

  return {
    // State
    mode,
    panel,
    config,
    isInitialized,
    isCustomized,
    isDark,
    canUndo,
    canRedo,

    // Theme Mode
    toggleMode,
    setMode,

    // Panel
    setPanel,

    // Full Theme
    applyTheme,

    // Colors
    setColor,
    getColor,

    // Typography
    setFont,
    getFont,

    // Spacing
    setSpacing,
    getSpacing,

    // Border Radius
    setRadius,
    getRadius,

    // Custom CSS
    setCustomCSS,

    // Reset & History
    reset,
    undo,
    redo,
    clearThemeHistory,

    // Import/Export
    exportTheme,
    importThemeFromJSON,
  };
}
