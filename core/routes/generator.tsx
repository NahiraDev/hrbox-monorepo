import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';
import { BaseLayout } from '@hrbox/core/layouts/BaseLayout';
import { AuthLayout } from '@hrbox/core/layouts/AuthLayout';
import { Panel } from '@core/config/design';
import { Suspense } from 'react';
import { Spinner } from '@heroui/react';
import { ProtectedRoute } from "@core/routes/protectedRoute";
import { ModulePlugin } from "@module/types";

interface ModuleContent {
  path: string;
  component: React.ComponentType;
}

interface ModuleSubHeader {
  path: string;
  component: React.ComponentType;
  props?: Record<string, any>;
}

/**
 * ✅ تولید مسیرهای ماژول‌ها به صورت خودکار
 */
export function generateModuleRoutes(module: ModulePlugin) {
  const isAuthModule = module.name === 'sso';
  const Layout = isAuthModule ? AuthLayout : BaseLayout;

  return (module.contents ?? []).map((content: ModuleContent) => {
    // پیدا کردن زیر هدر
    const subHeader = (module.subHeaders ?? []).find(
      (s: ModuleSubHeader) => s.path === content.path
    );

    // استخراج پنل از مسیر (مثلا /hrbox/... → hrbox)
    const pathSegments = content.path.split('/').filter(Boolean);
    const panelFromPath = pathSegments[0] as Panel | undefined;

    const Component = content.component;

    return createRoute({
      getParentRoute: () => rootRoute,
      path: content.path,
      component: () => (
        <Layout
          subHeader={subHeader?.component}
          subHeaderProps={subHeader?.props}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Spinner size="lg" color="primary" />
              </div>
            }
          >
            {isAuthModule ? (
              // ماژول احراز هویت بدون محافظت
              <Component />
            ) : (
              // سایر ماژول‌ها نیاز به محافظت دارند
              <ProtectedRoute requiredPanel={panelFromPath}>
                <Component />
              </ProtectedRoute>
            )}
          </Suspense>
        </Layout>
      ),
    });
  });
}