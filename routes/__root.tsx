import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from '@hrbox/core/redux/hooks';
import { initTheme } from '@hrbox/core/redux/slices/themeSlice';
import { initLanguage } from '@hrbox/core/redux/slices/languageSlice';
import { initAuth } from '@hrbox/core/redux/slices/authSlice';
import { useDomainInit } from "@hrbox/core/hooks/useDomainInit";
import { usePageTitle } from "@hrbox/core/hooks/usePageTitle";

export interface RootRouteContext {
  auth: {
    isAuthenticated: boolean;
    needsRoleSelection: boolean;
    currentPanel: any;
    selectedRole: any;
    user: any;
  };
}

function RootComponent() {
  const dispatch = useAppDispatch();

  useEffect(() => {

    dispatch(initTheme());

    dispatch(initLanguage());
    dispatch(initAuth());
  }, [dispatch]);
  useDomainInit();
  usePageTitle();
  return (
    <div className="min-h-screen bg-panel-background">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400">در حال بارگذاری...</p>
            </div>
          </div>
        }
      >
        <Outlet />
      </Suspense>

      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  );
}

export const rootRoute = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,

  errorComponent: ({ error }) => (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="max-w-md text-center p-8 bg-panel-surface rounded-2xl shadow-theme-lg">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-danger-50">
          <svg
            className="h-8 w-8 text-danger"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-danger mb-4">خطای غیرمنتظره</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {error.message || 'یک خطای ناشناخته رخ داده است'}
        </p>

        {import.meta.env.DEV && (
          <pre className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-left text-xs overflow-auto max-h-40">
            {error.stack}
          </pre>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2.5 bg-panel-primary text-white rounded-lg hover:opacity-90 transition-all font-medium"
        >
          بارگذاری مجدد
        </button>
      </div>
    </div>
  ),

  pendingComponent: () => (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="text-center">
        <div className="inline-block animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4" />
        <p className="text-neutral-600 dark:text-neutral-400">در حال بارگذاری صفحه...</p>
      </div>
    </div>
  ),
});