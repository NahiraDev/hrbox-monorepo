import { ModulePlugin, ModuleRoute } from './types';
import { moduleRegistry } from './registry';

/**
 * دریافت تمام routes محافظ شده
 */
export function getProtectedRoutes(): ModuleRoute[] {
  return moduleRegistry
    .getAllRoutes()
    .filter((route) => route.meta?.requireAuth !== false);
}

/**
 * دریافت routes عمومی
 */
export function getPublicRoutes(): ModuleRoute[] {
  return moduleRegistry
    .getAllRoutes()
    .filter((route) => route.meta?.requireAuth === false);
}

/**
 * فیلتر کردن routes بر اساس نقش
 */
export function filterRoutesByRole(routes: ModuleRoute[], userRoles: string[]): ModuleRoute[] {
  return routes.filter((route) => {
    if (!route.meta?.requiredRoles || route.meta.requiredRoles.length === 0) {
      return true;
    }

    return route.meta.requiredRoles.some((role) =>
      userRoles.includes(role)
    );
  });
}

/**
 * فیلتر کردن menu بر اساس دسترسی
 */
export function filterMenuByAccess(
  moduleName: string,
  userRoles: string[],
  userPermissions: string[]
): any[] {
  const menu = moduleRegistry.getModuleMenu(moduleName);

  return menu.filter((item) => {
    // بررسی دسترسی
    // می‌تواند در item meta ذخیره شود
    return true; // فعلا بدون فیلتر
  });
}