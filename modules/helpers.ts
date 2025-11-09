import { ModuleRoute } from "./types";
import { moduleRegistry } from "./registry";
import { useAuth } from "@hrbox/core/hooks/useAuth";

/**
 * ============================================
 * 1️⃣ دریافت routes محافظ شده
 * ============================================
 */
export function getProtectedRoutes(): ModuleRoute[] {
  return moduleRegistry
    .getAllRoutes()
    .filter((route) => route.meta?.requireAuth !== false);
}

/**
 * ============================================
 * 2️⃣ دریافت routes عمومی
 * ============================================
 */
export function getPublicRoutes(): ModuleRoute[] {
  return moduleRegistry
    .getAllRoutes()
    .filter((route) => route.meta?.requireAuth === false);
}

/**
 * ============================================
 * 3️⃣ فیلتر routes بر اساس نقش
 * ============================================
 */
export function filterRoutesByRole(
  routes: ModuleRoute[],
  userRoles: string[]
): ModuleRoute[] {
  return routes.filter((route) => {
    // اگر route نیاز به نقش خاصی ندارد، در دسترس است
    if (!route.meta?.requiredRoles || route.meta.requiredRoles.length === 0) {
      return true;
    }

    // اگر یکی از نقش‌های کاربر مطابقت داشت، دسترس دارد
    return route.meta.requiredRoles.some((role) =>
      userRoles.includes(role)
    );
  });
}

/**
 * ============================================
 * 4️⃣ فیلتر مسیر بر اساس مجوز
 * ============================================
 */
export function filterRoutesByPermission(
  routes: ModuleRoute[],
  userPermissions: string[]
): ModuleRoute[] {
  return routes.filter((route) => {
    // اگر route نیاز به مجوز خاصی ندارد
    if (!route.meta?.requiredPermissions || route.meta.requiredPermissions.length === 0) {
      return true;
    }

    // اگر یکی از مجوزهای کاربر مطابقت داشت
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
      // بررسی نقش
      if (item.requiredRoles && item.requiredRoles.length > 0) {
        const hasRole = item.requiredRoles.some((role: string) =>
          userRoles.includes(role)
        );
        if (!hasRole) return false;
      }

      // بررسی مجوز
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
          ),
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
  const { selectedRole } = useAuth(); // کاربر فعلی
  const userRoles = [selectedRole?.slug || ''];
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