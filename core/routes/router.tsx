import { moduleRegistry } from "@hrbox/modules/registry";
import { generateAllModuleRoutes } from "@hrbox/core/helpers/generateAllModuleRoutes";
import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "@routes/__root";
import { Panel } from "@core/config/theme";

export function setupRouter() {
  const allModules = moduleRegistry.getAllModules();

  return allModules.flatMap((module) =>
    generateAllModuleRoutes((module) ?? [])
  );
}


export function createRouteTree() {
  // دریافت تمام routes ماژول‌ها
  const moduleRoutes = generateAllModuleRoutes();

  // Routes خطا
  const forbiddenRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/403',
    component: () => <ForbiddenPage />,
  });

  const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '*',
    component: () => <NotFoundPage />,
  });

  // Index Route (Redirect Logic)
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: async ({ context }: any) => {
      // اگر لاگین نکرده
      if (!context.auth?.isAuthenticated) {
        throw redirect({ to: '/sso/login' });
      }

      if (context.auth?.needsRoleSelection) {
        throw redirect({ to: '/sso/select-role' });
      }

      const defaultRoutes: Record<Panel, string> = {
        hrlink: '/hrlink/dashboard',
        hrbox: '/hrbox/dashboard',
        'super-admin': '/super-admin/dashboard',
      };

      const currentPanel = context.auth?.currentPanel;
      const targetRoute = currentPanel ? defaultRoutes[currentPanel] : '/sso/welcome';

      throw redirect({ to: targetRoute });
    },
  });

  // ترکیب routes
  return rootRoute.addChildren([
    indexRoute,
    ...moduleRoutes,
    forbiddenRoute,
    notFoundRoute,
  ]);
}


function ForbiddenPage() {
  return (
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-danger mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-secondary-1000 dark:text-white mb-2">
          دسترسی رد شد
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          شما اجازه دسترسی به این صفحه را ندارید
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:opacity-90 transition-all font-medium"
          >
            بازگشت
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-2.5 bg-panel-primary text-white rounded-lg hover:opacity-90 transition-all font-medium shadow-md"
          >
            صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="max-w-md text-center p-8 bg-panel-surface rounded-2xl shadow-theme-lg">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-1000 dark:text-white mb-2">
          صفحه یافت نشد
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          صفحه مورد نظر شما یافت نشد یا حذف شده است
        </p>

        <button
          onClick={() => (window.location.href = '/')}
          className="px-6 py-2.5 bg-panel-primary text-white rounded-lg hover:opacity-90 transition-all font-medium shadow-md"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}