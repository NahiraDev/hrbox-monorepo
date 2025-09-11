import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { serviceRegistry } from '../helpers/serviceRegistry';

interface AppContentProps {
  fallback?: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> = ({ fallback = <div>Loading...</div> }) => {
  const location = useLocation();
  const [ContentComponent, setContentComponent] = React.useState<React.ComponentType<any> | null>(null);
  const [componentProps, setComponentProps] = React.useState<any>({});

  React.useEffect(() => {
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

export default AppContent;
