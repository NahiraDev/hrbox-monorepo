import { createRouter } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';
import { loginRoute } from '@hrbox/routes/sso/login';
import { selectRoleRoute } from '@hrbox/routes/sso/select-role';
import { welcomeRoute } from '@hrbox/routes/sso/welcome';
import { forbiddenRoute } from '@hrbox/routes/error/forbidden';
import { notFoundRoute } from '@hrbox/routes/error/not-found';
import { moduleRegistry } from '@hrbox/modules/registry';
import { generateModuleRoutes } from '@hrbox/core/routes/generator';

// تولید مسیرهای ماژول‌ها
const moduleRoutes = moduleRegistry
  .getAllModules()
  .filter((m) => m.name !== 'sso') // SSO routes دستی
  .flatMap((m) => generateModuleRoutes(m) ?? []);

// ساختار مسیرها
const routeTree = rootRoute.addChildren([
  loginRoute,
  selectRoleRoute,
  welcomeRoute,

  // Module Routes
  ...moduleRoutes,

  // Error Routes
  forbiddenRoute,
  notFoundRoute,
]);

// ایجاد Router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// Type Registration
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}