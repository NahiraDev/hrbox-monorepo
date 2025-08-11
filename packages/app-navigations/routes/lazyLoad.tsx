import React, { lazy, Suspense } from "react";
import { App } from "@package/app-shell";
import { AppLoader } from "@package/app-components";

export function lazyLoad(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
) {
  const LazyComponent = lazy(importFunc);

  const LazyLoadedComponent = (props: any) => (
    <App>
      <Suspense fallback={<AppLoader />}>
        <LazyComponent {...props} />
      </Suspense>
    </App>
  );

  LazyLoadedComponent.displayName = "LazyLoadedComponent";

  return LazyLoadedComponent;
}
