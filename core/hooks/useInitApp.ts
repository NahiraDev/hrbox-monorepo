import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useLanguage } from './useLanguage';

export function useInitApp() {
  const { init: initAuth } = useAuth();
  const { init: initLanguage } = useLanguage();

  useEffect(() => {
    initLanguage();
    
    initAuth();
  }, [initAuth, initLanguage]);
}