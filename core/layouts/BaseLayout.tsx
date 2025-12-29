import { ReactNode, Suspense } from "react";
import { useMatches } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { AppHeader } from "@hrbox/uikit/sections/AppHeader";
import { AppSidebar } from "@hrbox/uikit/sections/AppSideBar";
import { AppSupportButton } from "@hrbox/uikit/components/AppSupportButton";
import { AppDocs } from "@hrbox/uikit/sections/AppDocs";
import { useDynamicBackground } from "@hrbox/core/hooks/useDynamicBackground";

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  const matches = useMatches();
  const { panelBackground } = useDynamicBackground();

  const currentRoute = matches[matches.length - 1];
  const routeContext = currentRoute?.context as any;

  const SubHeader = routeContext?.subHeader;
  const subHeaderProps = routeContext?.subHeaderProps || {};
  return (
    <div
      className="h-full flex flex-col gap-6 xl:pr-16 pr-4 xl:pl-8 pl-4 xl:pb-8 pb-4 xl:pt-6 pt-4 bg-no-repeat bg-cover"
      style={{
        backgroundImage: panelBackground && `url(${panelBackground})`,
        backgroundColor: !panelBackground
          ? "var(--color-panel-background)"
          : undefined
      }}
    >
      <header className="shrink-0 z-20">
        <AppHeader />
      </header>
      <div className="flex-1 w-full flex overflow-hidden gap-8">
        <aside className="shrink-0 h-full">
          <AppSidebar />
        </aside>
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {SubHeader && (
            <Suspense
              fallback={<div className="h-16 shrink-0 animate-pulse" />}
            >
              <div className="shrink-0 dark:border-neutral-700">
                <SubHeader {...subHeaderProps} />
              </div>
            </Suspense>
          )}

          <main className="flex-1 flex flex-col overflow-hidden relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-hidden"
            >
              {children}
            </motion.div>

            <div className="shrink-0">
              <AppSupportButton />
            </div>
          </main>
        </div>
      </div>
      <div className="shrink-0 mx-auto">
        <AppDocs />
      </div>
    </div>
  );
}
