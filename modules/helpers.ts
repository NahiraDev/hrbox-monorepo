import { ModuleRoute } from "./types";
import { moduleRegistry } from "./registry";
import { useAuth } from "@hrbox/core/hooks/useAuth";

export function getProtectedRoutes(): ModuleRoute[] {
  return moduleRegistry
    .getAllRoutes()
    .filter((route) => route.meta?.requireAuth !== false);
}

export function getPublicRoutes(): ModuleRoute[] {
  return moduleRegistry
    .getAllRoutes()
    .filter((route) => route.meta?.requireAuth === false);
}

export function filterRoutesByRole(
  routes: ModuleRoute[],
  userRoles: string[]
): ModuleRoute[] {
  return routes.filter((route) => {
    if (!route.meta?.requiredRoles || route.meta.requiredRoles.length === 0) {
      return true;
    }

    return route.meta.requiredRoles.some((role) =>
      userRoles.includes(role)
    );
  });
}

export function filterRoutesByPermission(
  routes: ModuleRoute[],
  userPermissions: string[]
): ModuleRoute[] {
  return routes.filter((route) => {
    if (!route.meta?.requiredPermissions || route.meta.requiredPermissions.length === 0) {
      return true;
    }

    return route.meta.requiredPermissions.some((perm) =>
      userPermissions.includes(perm)
    );
  });
}

export function filterMenuByAccess(
  moduleName: string,
  userRoles: string[],
  userPermissions: string[]
): any[] {
  const menu = moduleRegistry.getModuleMenu(moduleName);

  return menu.filter((item) => {
    if (item.requiredRoles && item.requiredRoles.length > 0) {
      const hasRole = item.requiredRoles.some((role: string) =>
        userRoles.includes(role)
      );
      if (!hasRole) return false;
    }

    if (item.requiredPermissions && item.requiredPermissions.length > 0) {
      const hasPermission = item.requiredPermissions.some((perm: string) =>
        userPermissions.includes(perm)
      );
      if (!hasPermission) return false;
    }

    return true;
  });
}

export function filterMenuRecursively(
  menu: any[],
  userRoles: string[],
  userPermissions: string[]
): any[] {
  return menu
    .filter((item) => {
      if (item.requiredRoles && item.requiredRoles.length > 0) {
        const hasRole = item.requiredRoles.some((role: string) =>
          userRoles.includes(role)
        );
        if (!hasRole) return false;
      }

      if (item.requiredPermissions && item.requiredPermissions.length > 0) {
        const hasPermission = item.requiredPermissions.some((perm: string) =>
          userPermissions.includes(perm)
        );
        if (!hasPermission) return false;
      }

      return true;
    })
    .map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: filterMenuRecursively(
            item.children,
            userRoles,
            userPermissions
          )
        };
      }
      return item;
    });
}

export function canAccessRoute(
  route: ModuleRoute,
  userRoles: string[],
  userPermissions: string[]
): boolean {
  if (route.meta?.requiredRoles && route.meta.requiredRoles.length > 0) {
    const hasRole = route.meta.requiredRoles.some((role) =>
      userRoles.includes(role)
    );
    if (!hasRole) return false;
  }

  if (route.meta?.requiredPermissions && route.meta.requiredPermissions.length > 0) {
    const hasPermission = route.meta.requiredPermissions.some((perm) =>
      userPermissions.includes(perm)
    );
    if (!hasPermission) return false;
  }

  return true;
}


export function getAccessibleRoutes(
  userRoles: string[],
  userPermissions: string[]
): ModuleRoute[] {
  const allRoutes = moduleRegistry.getAllRoutes();

  return allRoutes.filter((route) =>
    canAccessRoute(route, userRoles, userPermissions)
  );
}

export function authMiddleware(
  userRoles: string[],
  userPermissions: string[]
) {
  const protectedRoutes = getProtectedRoutes();

  const accessibleRoutes = filterRoutesByRole(
    protectedRoutes,
    userRoles
  );

  return filterRoutesByPermission(
    accessibleRoutes,
    userPermissions
  );
}

export function useSidebarMenu(moduleName: string) {
  const { selectedRole } = useAuth();
  const userRoles = [selectedRole?.slug || ""];
  const userPermissions = selectedRole?.permissions || [];

  return filterMenuByAccess(
    moduleName,
    userRoles,
    userPermissions
  );
}

export function routeGuard(
  route: ModuleRoute,
  userRoles: string[],
  userPermissions: string[]
): boolean {
  return canAccessRoute(route, userRoles, userPermissions);
}


export function getUserRoutes(
  userRoles: string[],
  userPermissions: string[]
) {
  return getAccessibleRoutes(userRoles, userPermissions);
}