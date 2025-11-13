import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "@hrbox/routes/__root";
import { Suspense } from "react";
import type { ModulePlugin, ModuleRoute } from "@hrbox/modules/types";
import { Panel, RoleSlug } from "@hrbox/core/config/theme/roles";
import { Spinner } from "@heroui/react";
import { moduleRegistry } from "@hrbox/modules/registry";

// ============================================
// Import Layouts
// ============================================
import { BaseLayout } from "@hrbox/core/layouts/BaseLayout";
import { AuthLayout } from "@hrbox/core/layouts/AuthLayout";
import { EmptyLayout } from "@hrbox/core/layouts/EmptyLayout";

// ============================================
// Types
// ============================================

interface RouteContext {
  auth?: {
    isAuthenticated: boolean;
    needsRoleSelection: boolean;
    currentPanel: Panel | null;
    selectedRole: any;
    user: any;
  };
}

// ============================================
// Helper: Extract Panel from Path
// ============================================

function extractPanelFromPath(path: string): Panel | null {
  const segments = path.split('/').filter(Boolean);
  const panelSegment = segments[0];

  const panelMap: Record<any, Panel> = {
    hrlink: 'hrlink',
    hrbox: 'hrbox',
    'super-admin': 'super-admin',
  };

  return panelMap[panelSegment] || null;
}

// ============================================
// Helper: Get Layout Component
// ============================================

function getLayoutComponent(layoutType?: 'base' | 'auth' | 'empty') {
  switch (layoutType) {
    case 'auth':
      return AuthLayout;
    case 'empty':
      return EmptyLayout;
    case 'base':
    default:
      return BaseLayout;
  }
}

const generateModuleRoutes = (module: ModulePlugin) => {
  if (!module.routes || module.routes.length === 0) {
    return [];
  }

  return module.routes.map((route: ModuleRoute) => {
    const meta = route.meta || {};
    const requireAuth = meta.requireAuth !== false;
    const requiredPanel = extractPanelFromPath(route.path);
    const requiredRoles = meta.requiredRoles || [];
    const requiredPermissions = meta.requiredPermissions || [];

    const layoutType = route.layout || module.layout || 'base';
    const LayoutComponent = getLayoutComponent(layoutType);

    const Component = route.component;

    let SubHeaderComponent = route.subHeader;
    let subHeaderProps = route.subHeaderProps || {};

    if (!SubHeaderComponent && module.subHeaders) {
      const subHeaderConfig = module.subHeaders.find(
        (sh) => sh.path === route.path
      );
      if (subHeaderConfig) {
        SubHeaderComponent = subHeaderConfig.component;
        subHeaderProps = subHeaderConfig.props || {};
      }
    }

    return createRoute({
      getParentRoute: () => rootRoute,
      path: route.path,

      beforeLoad: async ({ context, location }: { context: RouteContext; location: any }) => {
        if (!requireAuth) {
          return {
            pageTitle: meta.title,
            breadcrumb: meta.title,
            subHeader: SubHeaderComponent,
            subHeaderProps,
            layout: layoutType,
          };
        }

        if (!context.auth?.isAuthenticated) {
          throw redirect({
            to:'/sso/login',
          });
        }

        // if (context.auth?.needsRoleSelection) {
        //   throw redirect({
        //     to: '/sso/select-role',
        //   });
        // }

        if (requiredPanel && context.auth?.currentPanel !== requiredPanel) {
          throw redirect({ to: '/403' });
        }

        if (requiredRoles.length > 0) {
          const userRole = context.auth?.selectedRole?.slug;
          const hasRole = requiredRoles.includes(userRole as RoleSlug);

          if (!hasRole) {
            throw redirect({ to: '/403' });
          }
        }

        if (requiredPermissions.length > 0) {
          const userPermissions = context.auth?.selectedRole?.permissions || [];
          const hasPermission = requiredPermissions.some((perm) =>
            userPermissions.includes(perm)
          );

          if (!hasPermission) {
            throw redirect({ to: '/403' });
          }
        }

        return {
          pageTitle: meta.title,
          breadcrumb: meta.title,
          subHeader: SubHeaderComponent,
          subHeaderProps,
          layout: layoutType,
        };
      },

      // ✅ Component با Layout
      component: () => (
        <LayoutComponent>
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <Spinner size="lg" color="primary" />
              </div>
            }
          >
            <Component />
          </Suspense>
        </LayoutComponent>
      ),
    });
  });
}
// ============================================
// Generate All Routes from Registry
// ============================================

export function generateAllModuleRoutes() {
  const allModules = moduleRegistry.getAllModules();
  if (allModules.length === 0) {
    return [];
  }

  const routes = allModules.flatMap((module) => {
    try {
      return generateModuleRoutes(module);
    } catch (error) {
      return [];
    }
  });

  console.log('📊 Total generated routes:', routes.length);
  return routes;
}

export function createRouteTree() {
  const moduleRoutes = generateAllModuleRoutes();
  const forbiddenRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/403',
    component: ForbiddenPage,
  });

  const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '*',
    component: NotFoundPage,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: async ({ context }: { context: RouteContext }) => {
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

  const allRoutes = [
    indexRoute,
    ...moduleRoutes,
    forbiddenRoute,
    notFoundRoute,
  ];

  console.log('📊 Total routes in tree:', allRoutes.length);

  return rootRoute.addChildren(allRoutes);
}

// ============================================
// Error Pages
// ============================================

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