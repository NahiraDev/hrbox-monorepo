import { useMemo } from 'react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { getLoginBackground } from '@hrbox/core/config/theme/domains';

/**
 * Hook برای دریافت Background پویا
 */
export function useDynamicBackground() {
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);
  const themeMode = useAppSelector((state: any) => state.theme.mode);

  const loginBackground = useMemo(() => {
    return getLoginBackground(currentPanel, themeMode);
  }, [currentPanel, themeMode]);

  return { loginBackground };
}