import { useLocation } from 'react-router-dom';
import React from 'react';

import { serviceRegistry } from '../helpers';
import { AppSupportButton, AppSideBar } from '../components';
import { AppDocs, AppHeader } from '../sections';


interface BaseLayoutProps {
  content: React.ReactNode;
  subHeader?: React.ReactNode;
}

export const BaseLayout = ({ content, subHeader }: BaseLayoutProps) => {
  const { pathname } = useLocation();
  const activeMenu = serviceRegistry.getActiveMenu(pathname);
  return (
    <div
      className="flex flex-col h-screen shadow-tight pr-16 pl-8 text-foreground bg-light-mode bg-blend-screen bg-no-repeat bg-center">
      <AppHeader />

      <div className="flex flex-1 min-h-0 gap-4">
        <div className="flex flex-1 min-h-0 gap-4 items-stretch">
          <div className="flex flex-col flex-1 min-h-0 gap-4">
            {subHeader && <div className="mb-4 shrink-0">{subHeader}</div>}

            <div className="flex flex-1 min-h-0 gap-8">
              <AppSideBar menu={activeMenu} />
              <div className="flex-1 overflow-y-auto rounded-xl border border-primary-400 bg-surface-50 dark:bg-[rgba(4,66,92,0.60)] shadow-light-tight-2 dark:shadow-dark-tight-2">
                {content}
              </div>
            </div>
            <div className="mb-4 shrink-0">
              <AppDocs />
            </div>
          </div>
        </div>
      </div>

      <AppSupportButton />
    </div>
  );
};
