import { useLocation } from 'react-router-dom';
import React from 'react';

import { serviceRegistry } from '../helpers';
import { AppSupportButton, AppSideBar } from '../components';
import { AppDocs, AppHeader } from '../sections';

interface BaseLayoutProps {
  content: React.ReactNode;
}

export const BaseLayout = ({ content }: BaseLayoutProps) => {
  const { pathname } = useLocation();
  const activeMenu = serviceRegistry.getActiveMenu(pathname);

  return (
    <div className="flex flex-col gap-[26px] shadow-tight h-[100vh] pr-16 pl-8">
      <AppHeader />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 h-full min-h-fit">
          <AppSideBar menu={activeMenu} />
          <div className="flex-1 min-h-fit h-full">
            <div className="w-full rounded-2xl border border-primary-400 bg-[#DCF0F966] p-3 h-full flex flex-col justify-between">
              {content}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-end">
          <AppDocs />
        </div>
        <AppSupportButton />
      </div>
    </div>
  );
};
