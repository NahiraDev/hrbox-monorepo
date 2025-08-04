import React, { lazy, Suspense } from 'react';
import { App } from '@hrbox/app-shell';
import { AppLoader } from '@hrbox/shared-components';

export function lazyLoad(importFunc: () => Promise<{ default: React.ComponentType<any> }>) {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <App>
      <Suspense fallback={<AppLoader />}>
        <LazyComponent {...props} />
      </Suspense>
    </App>
  );
}

