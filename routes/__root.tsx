import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { GlobalLoader } from '@hrbox/core/components/GlobalLoader';
import { useLoading } from '@hrbox/core/providers/LoadingContext';
import { useInitApp } from '@hrbox/core/hooks/useInitApp';
import { useEffect } from 'react';

function RootComponent() {
  const { isLoading, startLoading, stopLoading } = useLoading();

  useInitApp();

  return (
    <>
      <GlobalLoader isLoading={isLoading} />
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}

export const rootRoute = createRootRoute({
  component: RootComponent,
});
