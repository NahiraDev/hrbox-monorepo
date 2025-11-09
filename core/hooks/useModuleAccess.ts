import { useAuth } from '@core/hooks';
import {
  canAccessRoute,
  filterMenuByAccess,
  getAccessibleRoutes,
  getProtectedRoutes,
  getPublicRoutes
} from "@hrbox/modules/helpers";
import { ModuleRoute } from "@hrbox/modules/types";

export const useModuleAccess = () => {
  const { selectedRole } = useAuth();

  const userRoles = [selectedRole?.slug || ''];
  const userPermissions = selectedRole?.permissions || [];

  return {
    protectedRoutes: getProtectedRoutes(),
    publicRoutes: getPublicRoutes(),
    accessibleRoutes: getAccessibleRoutes(userRoles, userPermissions),

    getModuleMenu: (moduleName: string) =>
      filterMenuByAccess(moduleName, userRoles, userPermissions),

    canAccess: (route: ModuleRoute) =>
      canAccessRoute(route, userRoles, userPermissions),

    userRoles,
    userPermissions,
  };
};