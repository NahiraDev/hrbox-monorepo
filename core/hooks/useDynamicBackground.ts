import { useMemo } from 'react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import {getLoginBackground, getPanelBackground} from '@hrbox/core/config/theme/domains';

export function useDynamicBackground() {
  const currentPanel = useAppSelector((state: any) => state.auth.domainTheme);
  const themeMode = useAppSelector((state: any) => state.theme.mode);

  const loginBackground = useMemo(() => {
    return getLoginBackground(currentPanel, themeMode);
  }, [currentPanel, themeMode]);

  const panelBackground = useMemo(() => {
    return getPanelBackground(currentPanel, themeMode);
  }, [currentPanel, themeMode]);

  return { loginBackground , panelBackground };
}