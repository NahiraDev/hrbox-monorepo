import { Suspense, ReactNode } from 'react';
import { useMatches } from '@tanstack/react-router';
import { motion } from 'framer-motion';

import { AppHeader } from '@hrbox/uikit/sections/AppHeader';
import { AppSidebar } from '@hrbox/uikit/sections/AppSideBar';
import { AppSupportButton } from '@hrbox/uikit/components/AppSupportButton';
import { AppDocs } from '@hrbox/uikit/sections/AppDocs';

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const routeContext = currentRoute?.context as any;

  const SubHeader = routeContext?.subHeader;
  const subHeaderProps = routeContext?.subHeaderProps || {};

  return (
    <div className="flex h-screen w-full bg-panel-background overflow-hidden">
      <aside className="shrink-0 m-5">
        <AppSidebar />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="shrink-0 border-b border-neutral-200 dark:border-neutral-700">
          <AppHeader />
        </header>

        {SubHeader && (
          <Suspense
            fallback={
              <div className="h-16 shrink-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
            }
          >
            <div className="shrink-0  dark:border-neutral-700">
              <SubHeader {...subHeaderProps} />
            </div>
          </Suspense>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <div className="p-6 h-full">
              {children}
            </div>
          </motion.div>
          <AppDocs />

          <AppSupportButton />
        </main>
      </div>

    </div>
  );
}
