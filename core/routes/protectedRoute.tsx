import { Navigate } from '@tanstack/react-router';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { useRoleAccess } from '@hrbox/core/hooks/useRoleAccess';
import { Panel, RoleSlug } from '@core/config/theme';
import type React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPanel?: Panel;
  requiredRoles?: RoleSlug[];
}

/**
 * ✅ حفاظت از مسیرها در برابر دسترسی غیرمجاز
 * بررسی می‌کند:
 * 1. آیا کاربر لاگین کرده است
 * 2. آیا نقش انتخاب کرده است
 * 3. آیا پنل مطابقت دارد
 * 4. آیا نقش‌های لازم دارد
 */
export function ProtectedRoute({
                                 children,
                                 requiredPanel,
                                 requiredRoles,
                               }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated);
  const needsRoleSelection = useAppSelector((state:any) => state.auth.needsRoleSelection);
  const currentPanel = useAppSelector((state:any) => state.auth.currentPanel);
  const { hasRole } = useRoleAccess();

  // 1️⃣ کاربر لاگین نکرده → لاگین
  if (!isAuthenticated && !needsRoleSelection) {
    return <Navigate to="/sso/login" />;
  }

  // 2️⃣ کاربر باید نقش انتخاب کند → انتخاب نقش
  if (needsRoleSelection) {
    return <Navigate to="/sso/select-role" />;
  }

  // 3️⃣ کنترل پنل
  if (requiredPanel && currentPanel !== requiredPanel) {
    return <AccessDenied reason="wrong_panel" />;
  }

  // 4️⃣ کنترل نقش
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => hasRole(role));
    if (!hasRequiredRole) {
      return <AccessDenied reason="insufficient_role" />;
    }
  }

  return <>{children}</>;
}

/**
 * ✅ کامپوننت نمایش خطای دسترسی
 */
function AccessDenied({
                        reason = 'unknown',
                      }: {
  reason?: 'wrong_panel' | 'insufficient_role' | 'unknown';
}) {
  const messages: Record<string, { title: string; description: string }> = {
    wrong_panel: {
      title: 'پنل غلط',
      description: 'شما اجازه دسترسی به این بخش را ندارید',
    },
    insufficient_role: {
      title: 'نقش ناکافی',
      description: 'نقش شما برای دسترسی به این صفحه کافی نیست',
    },
    unknown: {
      title: 'دسترسی رد شد',
      description: 'متاسفانه شما دسترسی ندارید',
    },
  };

  const message = messages[reason];

  return (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-danger">403</h1>
        <p className="mt-4 text-xl font-semibold text-secondary-900 dark:text-white">
          {message.title}
        </p>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {message.description}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            بازگشت
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-2 bg-panel-primary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}