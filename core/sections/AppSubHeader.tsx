import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceRegistry } from 'core/helpers';

const AppSubHeader: React.FC = () => {
  const location = useLocation();
  const [SubHeaderComponent, setSubHeaderComponent] = React.useState<React.ComponentType<any> | null>(null);
  const [componentProps, setComponentProps] = React.useState<any>({});

  React.useEffect(() => {
    const config = serviceRegistry.getSubHeaderForPath(location.pathname);

    if (!config || !config.component) {
      setSubHeaderComponent(null);

      return;
    }

    const params = extractParams(location.pathname, config.path);

    setSubHeaderComponent(() => config.component);
    setComponentProps({ ...config.props, ...params });
  }, [location.pathname]);

  if (!SubHeaderComponent) return null;

  return (
    <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
      <SubHeaderComponent {...componentProps} />
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

export default AppSubHeader;
