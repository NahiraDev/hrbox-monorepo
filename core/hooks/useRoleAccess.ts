import { useAppSelector } from '@hrbox/core/redux/hooks';
import { RoleSlug } from '@hrbox/core/config/theme';

export function useRoleAccess() {
  const selectedRole = useAppSelector((state:any) => state.auth.selectedRole);

  const hasRole = (roleSlug: RoleSlug): boolean => {
    return selectedRole?.slug === roleSlug;
  };

  const hasPermission = (permission: string): boolean => {
    return selectedRole?.permissions.includes(permission) ?? false;
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some((p) => hasPermission(p));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every((p) => hasPermission(p));
  };

  const isJobSeeker = () => hasRole(RoleSlug.JOB_SEEKER);
  const isOrganization = () => hasRole(RoleSlug.ORGANIZATION);
  const isSuperAdmin = () => hasRole(RoleSlug.SUPER_ADMIN);

  return {
    selectedRole,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isJobSeeker,
    isOrganization,
    isSuperAdmin,
  };
}