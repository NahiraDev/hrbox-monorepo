import React from 'react';
import { useLocation } from 'react-router-dom';

import { AppSupportButton } from '../components';
import { AppDocs, AppHeader , AppSideBar} from '../sections';

interface BaseLayoutProps {
  content: React.ReactNode;
}

export const BaseLayout = ({ content }: BaseLayoutProps) => {
  const location = useLocation();

  const getSubHeader = () => {
    const routePath = location.pathname.split('/').pop() || '';

    if (routePath) {
      const SubHeaderComponent = routePath;

      return <SubHeaderComponent />;
    }

    return null;
  };

  const subHeader = getSubHeader();

  return (
    <div className="flex flex-col h-screen shadow-tight pr-16 pl-8 text-foreground bg-light-mode bg-blend-screen bg-no-repeat bg-center">
      <AppHeader />

      <div className="flex flex-1 min-h-0 gap-4">
        <div className="flex flex-1 min-h-0 gap-4 items-stretch">
          <div className="flex flex-col flex-1 min-h-0 gap-4">
            {subHeader && <div className="mb-4 shrink-0">{subHeader}</div>}

            <div className="flex flex-1 min-h-0 gap-8">
              <AppSideBar />
              <div className="flex-1 rounded-xl border border-primary-400 bg-surface-50 dark:bg-[rgba(4,66,92,0.60)] shadow-light-tight-2 dark:shadow-dark-tight-2 overflow-hidden p-4 relative">
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
