import { Navigate } from '@tanstack/react-router';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { Panel, RoleSlug } from '@core/config/theme';
import type React from 'react';
import { useModuleAccess } from "@core/hooks/useModuleAccess";

interface EnhancedProtectedRouteProps {
  children: React.ReactNode;
  requiredPanel?: Panel;
  requiredRoles?: RoleSlug[];
  requiredPermissions?: string[];
  fallbackPath?: string;
}

export function EnhancedProtectedRoute({
                                         children,
                                         requiredPanel,
                                         requiredRoles = [],
                                         requiredPermissions = [],
                                         fallbackPath = '/403',
                                       }: EnhancedProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
  const needsRoleSelection = useAppSelector((state: any) => state.auth.needsRoleSelection);
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);
  const selectedRole = useAppSelector((state: any) => state.auth.selectedRole);

  const { canAccess, userRoles, userPermissions } = useModuleAccess();

  // ============================================
  // 1️⃣ Authentication Check
  // ============================================
  if (!isAuthenticated && !needsRoleSelection) {
    return <Navigate to="/sso/login" />;
  }

  // ============================================
  // 2️⃣ Role Selection Check
  // ============================================
  if (needsRoleSelection) {
    return <Navigate to="/sso/select-role" />;
  }

  // ============================================
  // 3️⃣ Panel Check
  // ============================================
  if (requiredPanel && currentPanel !== requiredPanel) {
    return (
      <AccessDenied
        reason="wrong_panel"
        requiredPanel={requiredPanel}
        currentPanel={currentPanel}
      />
    );
  }

  // ============================================
  // 4️⃣ Role Check
  // ============================================
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return (
        <AccessDenied
          reason="insufficient_role"
          requiredRoles={requiredRoles}
          userRoles={userRoles}
        />
      );
    }
  }

  // ============================================
  // 5️⃣ Permission Check
  // ============================================
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = requiredPermissions.some((perm) =>
      userPermissions.includes(perm)
    );

    if (!hasRequiredPermission) {
      return (
        <AccessDenied
          reason="insufficient_permission"
          requiredPermissions={requiredPermissions}
          userPermissions={userPermissions}
        />
      );
    }
  }

  // ============================================
  // ✅ Access Granted
  // ============================================
  return <>{children}</>;
}