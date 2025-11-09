import { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Spinner } from '@heroui/react';

export function EmptyLayout() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-panel-background">
          <Spinner size="lg" color="primary" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}