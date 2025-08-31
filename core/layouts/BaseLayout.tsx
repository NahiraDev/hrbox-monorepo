import { useLocation } from 'react-router-dom';
import React from 'react';

import { serviceRegistry } from '../helpers';
import { AppSupportButton, AppSideBar } from '../components';
import { AppDocs, AppHeader } from '../sections';
import DarkModeBackground from '../assets/img/darkmode-bg.png';
import LightModeBackground from '../assets/img/lightmode-bg.png';
import { useTheme } from '@heroui/use-theme';

interface BaseLayoutProps {
  content: React.ReactNode;
  subHeader?: React.ReactNode;
}

export const BaseLayout = ({ content, subHeader }: BaseLayoutProps) => {
  const { pathname } = useLocation();
  const activeMenu = serviceRegistry.getActiveMenu(pathname);
  const { theme } = useTheme();
  return (
    <div
      className="flex flex-col h-screen shadow-tight pr-16 pl-8"
      style={{
        backgroundImage: `url(${theme === 'light' ? LightModeBackground : DarkModeBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <AppHeader />

      <div className="flex flex-1 min-h-0 gap-4">
        <div className="flex flex-1 min-h-0 gap-4 items-stretch">
          <AppSideBar menu={activeMenu} />

          <div className="flex flex-col flex-1 min-h-0">
            {subHeader && <div className="mb-4 shrink-0">{subHeader}</div>}

            <div className="flex-1 overflow-y-auto rounded-2xl border border-primary-400 bg-[#DCF0F966] ">
              {content}
            </div>

            <div className="mt-4 shrink-0">
              <AppDocs />
            </div>
          </div>
        </div>
      </div>

      <AppSupportButton />
    </div>
  );
};
