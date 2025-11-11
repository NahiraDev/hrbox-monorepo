import { useMemo } from 'react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { moduleRegistry } from '@hrbox/modules/registry';
import { Panel, RoleSlug } from '@hrbox/core/config/theme';
import type { ModuleRoute } from '@module/types';

// ============================================
// Types
// ============================================

interface RouteAccessCheck {
  canAccess: boolean;
  reason?: 'no_auth' | 'wrong_panel' | 'insufficient_role' | 'insufficient_permission';
  missingRoles?: RoleSlug[];
  missingPermissions?: string[];
}

interface UseRouteAccessReturn {
  // بررسی دسترسی
  canAccessRoute: (path: string) => boolean;
  checkRouteAccess: (path: string) => RouteAccessCheck;

  // لیست routes
  accessibleRoutes: ModuleRoute[];
  protectedRoutes: ModuleRoute[];
  publicRoutes: ModuleRoute[];

  // فیلتر routes
  filterRoutesByPanel: (panel: Panel) => ModuleRoute[];
  filterRoutesByRole: (roles: RoleSlug[]) => ModuleRoute[];
  filterRoutesByPermission: (permissions: string[]) => ModuleRoute[];

  // معلومات کاربر
  userRoles: RoleSlug[];
  userPermissions: string[];
  currentPanel: Panel | null;
  isAuthenticated: boolean;
}

// ============================================
// Main Hook
// ============================================

export function useRouteAccess(): UseRouteAccessReturn {
  // Redux state
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
  const selectedRole = useAppSelector((state: any) => state.auth.selectedRole);
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);

  const userRoles = useMemo(() => {
    if (!selectedRole) return [];
    return [selectedRole.slug as RoleSlug];
  }, [selectedRole]);

  const userPermissions = useMemo(() => {
    if (!selectedRole?.permissions) return [];
    return selectedRole.permissions;
  }, [selectedRole]);

  const allRoutes = useMemo(() => {
    return moduleRegistry.getAllRoutes();
  }, []);

  const checkRouteAccess = (path: string): RouteAccessCheck => {
    const route = allRoutes.find((r) => r.path === path);

    if (!route) {
      return { canAccess: false, reason: 'no_auth' };
    }

    if (route.meta?.requireAuth === false) {
      return { canAccess: true };
    }

    if (!isAuthenticated) {
      return { canAccess: false, reason: 'no_auth' };
    }

    if (route.meta?.requiredPanel && route.meta.requiredPanel !== currentPanel) {
      return { canAccess: false, reason: 'wrong_panel' };
    }

    if (route.meta?.requiredRoles && route.meta.requiredRoles.length > 0) {
      const hasRole = route.meta.requiredRoles.some((role: RoleSlug) =>
        userRoles.includes(role as RoleSlug)
      );

      if (!hasRole) {
        const missingRoles = route.meta.requiredRoles.filter(
          (role: RoleSlug) => !userRoles.includes(role as RoleSlug)
        );
        return {
          canAccess: false,
          reason: 'insufficient_role',
          missingRoles: missingRoles as RoleSlug[],
        };
      }
    }

    if (route.meta?.requiredPermissions && route.meta.requiredPermissions.length > 0) {
      const hasPermission = route.meta.requiredPermissions.some((perm: any) =>
        userPermissions.includes(perm)
      );

      if (!hasPermission) {
        const missingPermissions = route.meta.requiredPermissions.filter(
          (perm: any) => !userPermissions.includes(perm)
        );
        return {
          canAccess: false,
          reason: 'insufficient_permission',
          missingPermissions,
        };
      }
    }

    return { canAccess: true };
  };

  const canAccessRoute = (path: string): boolean => {
    return checkRouteAccess(path).canAccess;
  };

  const accessibleRoutes = useMemo(() => {
    return allRoutes.filter((route) => canAccessRoute(route.path));
  }, [allRoutes, isAuthenticated, userRoles, userPermissions, currentPanel]);

  const protectedRoutes = useMemo(() => {
    return allRoutes.filter((route) => route.meta?.requireAuth !== false);
  }, [allRoutes]);

  const publicRoutes = useMemo(() => {
    return allRoutes.filter((route) => route.meta?.requireAuth === false);
  }, [allRoutes]);

  const filterRoutesByPanel = (panel: Panel): ModuleRoute[] => {
    return allRoutes.filter(
      (route) => route.meta?.requiredPanel === panel || !route.meta?.requiredPanel
    );
  };

  const filterRoutesByRole = (roles: RoleSlug[]): ModuleRoute[] => {
    return allRoutes.filter((route) => {
      if (!route.meta?.requiredRoles || route.meta.requiredRoles.length === 0) {
        return true;
      }
      return route.meta.requiredRoles.some((role) =>
        roles.includes(role as RoleSlug)
      );
    });
  };

  const filterRoutesByPermission = (permissions: string[]): ModuleRoute[] => {
    return allRoutes.filter((route) => {
      if (!route.meta?.requiredPermissions || route.meta.requiredPermissions.length === 0) {
        return true;
      }
      return route.meta.requiredPermissions.some((perm: string) =>
        permissions.includes(perm)
      );
    });
  };

  return {
    canAccessRoute,
    checkRouteAccess,

    accessibleRoutes,
    protectedRoutes,
    publicRoutes,

    filterRoutesByPanel,
    filterRoutesByRole,
    filterRoutesByPermission,

    userRoles,
    userPermissions,
    currentPanel,
    isAuthenticated,
  };
}

export function canAccessRoute(
  path: string,
  userRoles: RoleSlug[],
  userPermissions: string[],
  currentPanel: Panel
): boolean {
  const meta = getRouteMeta(path);

  if (!meta) return false;

  if (meta.requiredPanel && meta.requiredPanel !== currentPanel) {
    return false;
  }

  if (meta.requiredRoles && meta.requiredRoles.length > 0) {
    const hasRole = meta.requiredRoles.some((role: RoleSlug) =>
      userRoles.includes(role)
    );
    if (!hasRole) return false;
  }

  if (meta.requiredPermissions && meta.requiredPermissions.length > 0) {
    const hasPermission = meta.requiredPermissions.some((perm: string) =>
      userPermissions.includes(perm)
    );
    if (!hasPermission) return false;
  }

  return true;
}