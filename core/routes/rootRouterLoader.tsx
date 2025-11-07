import { useEffect, useState } from 'react';
import { useLocation, type RouteObject } from 'react-router-dom';

import { RoutesProvider } from '@hrbox/core/providers/RoutesProvider';
import { AppLoader } from '@hrbox/uikit/components';
import { App } from '@core/app';

import { MotionRouter } from '@core/routes';
import {ProjectRoutesMap} from "@hrbox/modules";

export const RootRouterLoader = () => {
  const location = useLocation();
  const [currentRoutes, setCurrentRoutes] = useState<RouteObject[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setHasError(false);
      setCurrentRoutes(null);

      const [base] = location.pathname.split('/').filter(Boolean);
      const basePath = base ? `/${base}` : '/';

      const loader = ProjectRoutesMap[basePath];

      try {
        const mod = await loader();

        setCurrentRoutes(mod.routes);
      } catch {
        setHasError(true);
      }
    };

    load();
  }, [location.pathname]);

  if (hasError) return <div>خطا در بارگذاری مسیرها</div>;
  if (!currentRoutes) return <AppLoader />;

  return (
    <RoutesProvider routes={currentRoutes}>
      <App>
        <MotionRouter />
      </App>
    </RoutesProvider>
  );
};
