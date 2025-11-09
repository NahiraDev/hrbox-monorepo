interface AccessDeniedProps {
  reason: 'wrong_panel' | 'insufficient_role' | 'insufficient_permission' | 'unknown';
  requiredPanel?: Panel;
  currentPanel?: Panel;
  requiredRoles?: RoleSlug[];
  userRoles?: string[];
  requiredPermissions?: string[];
  userPermissions?: string[];
}

function AccessDenied({
                        reason = 'unknown',
                        requiredPanel,
                        currentPanel,
                        requiredRoles = [],
                        userRoles = [],
                        requiredPermissions = [],
                        userPermissions = [],
                      }: AccessDeniedProps) {
  const messages: Record<string, { title: string; description: string }> = {
    wrong_panel: {
      title: 'پنل نادرست',
      description: `این صفحه در پنل ${requiredPanel} است. شما در حال حاضر در پنل ${currentPanel} هستید.`,
    },
    insufficient_role: {
      title: 'نقش ناکافی',
      description: `برای دسترسی به این صفحه یکی از نقش‌های زیر لازم است: ${requiredRoles.join(', ')}`,
    },
    insufficient_permission: {
      title: 'مجوز ناکافی',
      description: `برای دسترسی به این صفحه یکی از مجوزهای زیر لازم است: ${requiredPermissions.join(', ')}`,
    },
    unknown: {
      title: 'دسترسی رد شد',
      description: 'متأسفانه شما دسترسی به این صفحه را ندارید.',
    },
  };

  const message = messages[reason];

  return (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="max-w-md text-center p-8 bg-panel-surface rounded-2xl shadow-theme-lg">
        {/* Icon */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-danger-50">
          <svg
            className="h-8 w-8 text-danger"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-danger mb-4">403</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-secondary-1000 dark:text-white mb-2">
          {message.title}
        </h2>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {message.description}
        </p>

        {/* Debug Info (Only in Development) */}
        {import.meta.env.DEV && (
          <div className="mb-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-4 text-left text-sm">
            <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
              <strong>Debug Info:</strong>
              <br />
              Reason: {reason}
              {requiredPanel && (
                <>
                  <br />
                  Required Panel: {requiredPanel}
                  <br />
                  Current Panel: {currentPanel}
                </>
              )}
              {requiredRoles.length > 0 && (
                <>
                  <br />
                  Required Roles: {requiredRoles.join(', ')}
                  <br />
                  User Roles: {userRoles.join(', ')}
                </>
              )}
              {requiredPermissions.length > 0 && (
                <>
                  <br />
                  Required Permissions: {requiredPermissions.join(', ')}
                  <br />
                  User Permissions: {userPermissions.join(', ')}
                </>
              )}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:opacity-90 transition-all font-medium"
          >
            بازگشت
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-2.5 bg-panel-primary text-white rounded-lg hover:opacity-90 transition-all font-medium shadow-md"
          >
            صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}