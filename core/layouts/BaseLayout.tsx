import { Suspense } from 'react';
import { Outlet, useRouteContext } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Spinner } from '@heroui/react';

import { AppHeader } from '@hrbox/uikit/sections/AppHeader';
import { AppSideBar } from '@hrbox/uikit/sections/AppSideBar';
import { AppSupportButton } from '@hrbox/uikit/components';
import { AppDocs } from '@hrbox/uikit/sections/AppDocs';

/**
 * ✅ Layout اصلی برای تمام صفحات محافظ شده
 * شامل: Sidebar, Header, SubHeader, Main Content, Support Button, Dock Menu
 */
export function BaseLayout() {
  // دریافت context از root route
  const context = useRouteContext({ from: '__root__' });
  const SubHeader = context?.component;
  const subHeaderProps = context?.props;

  return (
    <div className="flex h-screen w-full bg-panel-background overflow-hidden">
      {/* 1️⃣ Sidebar */}
      <aside className="flex-shrink-0 border-r border-neutral-200 dark:border-neutral-700">
        <AppSideBar />
      </aside>

      {/* 2️⃣ Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-neutral-200 dark:border-neutral-700">
          <AppHeader />
        </header>

        {/* Optional Sub-Header */}
        {SubHeader && (
          <Suspense
            fallback={
              <div className="h-16 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
            }
          >
            <div className="flex-shrink-0 border-b border-neutral-200 dark:border-neutral-700">
              <SubHeader {...subHeaderProps} />
            </div>
          </Suspense>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center bg-panel-background">
                <div className="flex flex-col items-center gap-4">
                  <Spinner size="lg" color="primary" />
                  <p className="text-neutral-500 dark:text-neutral-400">
                    بارگذاری محتوا...
                  </p>
                </div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <div className="p-6 h-full">
                <Outlet />
              </div>
            </motion.div>
          </Suspense>

          {/* Support Button */}
          <AppSupportButton />
        </main>
      </div>

      {/* 3️⃣ Dock Menu (HRBox only) */}
      <AppDocs />
    </div>
  );
}