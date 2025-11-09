import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';
import { Suspense, lazy } from 'react';
import type { ModulePlugin, ModuleRoute } from '@hrbox/modules/types';
import { Panel, RoleSlug } from '@core/config/theme';
import { Spinner } from '@heroui/react';
import { extractPanelFromPath } from "@core/helpers/extractPanelFromPath";

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
// Generate TanStack Routes from Module
// ============================================

export function generateModuleRoutes(module: ModulePlugin) {
  if (!module.routes || module.routes.length === 0) {
    return [];
  }

  const isAuthModule = module.name === 'sso';

  return module.routes.map((route: ModuleRoute) => {
    const meta = route.meta || {};
    const requireAuth = meta.requireAuth !== false;
    const requiredPanel = extractPanelFromPath(route.path);
    const requiredRoles = meta.requiredRoles || [];
    const requiredPermissions = meta.requiredPermissions || [];

    // Component
    const Component = route.component;

    // ============================================
    // Create TanStack Route
    // ============================================
    return createRoute({
      getParentRoute: () => rootRoute,
      path: route.path,

      // ============================================
      // Before Load Hook (Guards)
      // ============================================
      beforeLoad: async ({ context, location }: { context: RouteContext; location: any }) => {
        // 1️⃣ اگر route نیاز به احراز هویت ندارد
        if (!requireAuth) {
          return {};
        }

        // 2️⃣ بررسی لاگین
        if (!context.auth?.isAuthenticated) {
          throw redirect({
            to: '/sso/login',
            search: { redirect: location.pathname },
          });
        }

        // 3️⃣ بررسی نیاز به انتخاب نقش
        if (context.auth?.needsRoleSelection) {
          throw redirect({
            to: '/sso/select-role',
            search: { redirect: location.pathname },
          });
        }

        // 4️⃣ بررسی پنل
        if (requiredPanel && context.auth?.currentPanel !== requiredPanel) {
          throw redirect({ to: '/403' });
        }

        // 5️⃣ بررسی نقش
        if (requiredRoles.length > 0) {
          const userRole = context.auth?.selectedRole?.slug;
          const hasRole = requiredRoles.includes(userRole as RoleSlug);

          if (!hasRole) {
            throw redirect({ to: '/403' });
          }
        }

        // 6️⃣ بررسی مجوز
        if (requiredPermissions.length > 0) {
          const userPermissions = context.auth?.selectedRole?.permissions || [];
          const hasPermission = requiredPermissions.some((perm) =>
            userPermissions.includes(perm)
          );

          if (!hasPermission) {
            throw redirect({ to: '/403' });
          }
        }

        // ✅ Access granted
        return {
          pageTitle: meta.title,
          breadcrumb: meta.title,
        };
      },

      // ============================================
      // Component with Suspense
      // ============================================
      component: () => (
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center bg-panel-background">
              <Spinner size="lg" color="primary" />
            </div>
          }
        >
          <Component />
        </Suspense>
      ),
    });
  });
}