import { useCallback, useMemo } from "react";
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { moduleRegistry } from '@hrbox/modules/registry';
import { filterMenuRecursively } from '@hrbox/modules/helpers';

export function useModuleAccess() {
  const selectedRole = useAppSelector((state: any) => state.auth.selectedRole);

  // استخراج نقش‌ها و مجوزها
  const userRoles = useMemo(() => {
    if (!selectedRole) return [];
    return [selectedRole.slug];
  }, [selectedRole]);

  const userPermissions = useMemo(() => {
    if (!selectedRole?.permissions) return [];
    return selectedRole.permissions;
  }, [selectedRole]);


  const getModuleMenu = useCallback(
    (moduleName: string) => {
      const module = moduleRegistry.getModule(moduleName);
      if (!module?.menu) return [];

      // فیلتر کردن منو بر اساس دسترسی
      return filterMenuRecursively(module.menu, userRoles, userPermissions);
    },
    [userRoles, userPermissions]
  );

  /**
   * بررسی دسترسی به یک ماژول
   */
  const canAccessModule = useCallback(
    (moduleName: string): boolean => {
      return moduleRegistry.hasModuleAccess(moduleName, userRoles, userPermissions);
    },
    [userRoles, userPermissions]
  );

  /**
   * دریافت تمام ماژول‌های قابل دسترسی
   */
  const accessibleModules = useMemo(() => {
    return moduleRegistry
      .getAllModules()
      .filter((module) =>
        moduleRegistry.hasModuleAccess(module.name, userRoles, userPermissions)
      );
  }, [userRoles, userPermissions]);

  return {
    getModuleMenu,
    canAccessModule,
    accessibleModules,
    userRoles,
    userPermissions,
  };
}
