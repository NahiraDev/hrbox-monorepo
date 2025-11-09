import { createRoute, createRouter, redirect } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';
import { moduleRegistry } from '@hrbox/modules/registry';
import { generateModuleRoutes } from './generator';

// تولید مسیرهای ماژول‌ها
const allModules = moduleRegistry.getAllModules();
const moduleRoutes = allModules.flatMap((module) =>
  generateModuleRoutes(module) ?? []
);

// ✅ صفحه اصلی (ریدایرکت)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: async ({ context }: any) => {
    if (context.auth?.isAuthenticated && context.auth?.currentPanel) {
      const defaultRoute = {
        hrlink: '/hrlink/dashboard',
        hrbox: '/hrbox/dashboard',
        'super-admin': '/super-admin/dashboard',
      }[context.auth.currentPanel];

      throw redirect({ to: defaultRoute || '/hrlink/dashboard' });
    }

    // در غیر اینصورت، به صفحه لاگین بفرست
    throw redirect({ to: '/sso/login' });
  },
});

// ✅ صفحه 403 (دسترسی رد شده)
const forbiddenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/403',
  component: () => (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <p className="mt-4 text-xl">دسترسی رد شد</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-panel-primary text-white rounded-lg"
        >
          بازگشت
        </button>
      </div>
    </div>
  ),
});

// ✅ صفحه 404 (صفحه یافت نشد)
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl">صفحه یافت نشد</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-panel-primary text-white rounded-lg"
        >
          بازگشت
        </button>
      </div>
    </div>
  ),
});

// ✅ درخت مسیرها
const routeTree = rootRoute.addChildren([
  indexRoute,
  ...moduleRoutes,
  forbiddenRoute,
  notFoundRoute,
]);

// ✅ ایجاد Router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: {
    auth: null,
    theme: null,
  },
});