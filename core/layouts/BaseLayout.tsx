import { useEffect, useState } from 'react';
import { serviceRegistry } from 'core/helpers';
import { useLocation } from 'react-router-dom';

import { AppSupportButton } from '../components';
import { AppDocs, AppHeader, AppSideBar, AppSubHeader, AppContent } from '../sections';

export const BaseLayout = () => {
  const location = useLocation();
  const [showDoc, setShowDoc] = useState<boolean>(false);

  useEffect(() => {
    const getModuleName: string | undefined = serviceRegistry.getModuleName();

    if (getModuleName !== 'hrlink') {
      setShowDoc(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen shadow-tight pr-16 pl-8 text-foreground bg-light-mode bg-blend-screen bg-no-repeat bg-center pb-10">
      <AppHeader />

      <div className="flex flex-1 min-h-0 gap-4">
        <div className="flex flex-1 min-h-0 gap-4 items-stretch">
          <div className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="flex flex-1 min-h-0 gap-8 w-full">
              <AppSideBar />
              <div className="flex flex-col gap-3 w-full">
                <AppSubHeader />
                <AppContent
                  fallback={
                    <div className="flex items-center justify-center h-full">
                      <div className={`${showDoc ? 'border border-primary-400 bg-surface-50 dark:bg-[rgba(4,66,92,0.60)] shadow-theme-md' : 'rounded-xl'} flex-1 overflow-hidden relative`} />
                    </div>
                  }
                />
              </div>
            </div>
            {showDoc && (
              <div className="mb-4 shrink-0">
                <AppDocs />
              </div>
            )}
          </div>
        </div>
      </div>

      <AppSupportButton />
    </div>
  );
};
