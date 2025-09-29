import { ComponentType, FC, ReactNode, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { serviceRegistry } from '@core/helpers';

interface AppContentProps {
  fallback?: ReactNode;
}

export const AppContent: FC<AppContentProps> = ({ fallback = <div>Loading...</div> }) => {
  const location = useLocation();
  const [ContentComponent, setContentComponent] = useState<ComponentType<any> | null>(null);
  const [componentProps, setComponentProps] = useState<any>({});

  useEffect(() => {
    const config = serviceRegistry.getContentForPath(location.pathname);

    if (!config) {
      setContentComponent(null);

      return;
    }

    const params = extractParams(location.pathname, config.path);

    setContentComponent(() => config.component);
    setComponentProps({ ...config.props, ...params });
  }, [location.pathname]);

  if (!ContentComponent) {
    return <div>Content not found for this path</div>;
  }

  return (
    <Suspense fallback={fallback}>
      <ContentComponent {...componentProps} />
    </Suspense>
  );
};

function extractParams(currentPath: string, pattern: string): Record<string, string> {
  const params: Record<string, string> = {};
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = currentPath.split('/').filter(Boolean);

  patternParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1);

      params[paramName] = pathParts[index];
    }
  });

  return params;
}
