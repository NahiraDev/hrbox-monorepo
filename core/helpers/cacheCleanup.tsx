import { useEffect } from 'react';
import { useFormCache } from '@core/hooks/useFormCache';

export const CacheCleanup = () => {
  const { clearExpired } = useFormCache();

  useEffect(() => {
    clearExpired(24 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      clearExpired(24 * 60 * 60 * 1000);
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [clearExpired]);

  return null;
};
