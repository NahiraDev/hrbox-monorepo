import React, { lazy, Suspense } from 'react';

import { AppLoader } from '../components';

export function lazyLoad(importFunc: () => Promise<{ default: React.ComponentType<any> }>) {
  const LazyComponent = lazy(importFunc);

  const LazyLoadedComponent = (props: any) => (
    <Suspense fallback={<AppLoader />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  LazyLoadedComponent.displayName = 'LazyLoadedComponent';

  return LazyLoadedComponent;
}
