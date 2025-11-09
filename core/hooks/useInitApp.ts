import { useEffect } from 'react';
import { useTheme } from './useTheme';
import { useAuth } from './useAuth';
import { useLanguage } from './useLanguage';

export function useInitApp() {
  const { init: initTheme } = useTheme();
  const { init: initAuth } = useAuth();
  const { init: initLanguage } = useLanguage();

  useEffect(() => {
    initLanguage();

    initTheme();

    initAuth();
  }, [initTheme, initAuth, initLanguage]);
}