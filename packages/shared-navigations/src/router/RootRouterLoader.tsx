import { useEffect, useState } from 'react';
import { useLocation, type RouteObject } from 'react-router-dom';
import { ProjectRoutesMap } from './dynamicRoutesMap';
import { RoutesProvider } from '@hrbox/shared-templates';
import { AppRoutes } from '@hrbox/shared-components';
import { AppLoader } from '@hrbox/shared-components';

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
      } catch (err) {
        console.error(err);
        setHasError(true);
      }
    };

    load();
  }, [location.pathname]);

  if (hasError) return <div>خطا در بارگذاری مسیرها</div>;
  if (!currentRoutes) return <AppLoader/>;

  return (
    <RoutesProvider routes={currentRoutes}>
      <AppRoutes/>
    </RoutesProvider>
  )
}
