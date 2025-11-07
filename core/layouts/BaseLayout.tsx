import { useEffect, useState } from 'react';
import { serviceRegistry } from '@core/helpers';
import { useLocation } from 'react-router-dom';

import { AppSupportButton } from '@hrbox/uikit/components';
import { AppDocs, AppHeader, AppSideBar, AppSubHeader, AppContent } from '@hrbox/uikit/sections';
import { ProtectedRoute } from '@hrbox/core/routes/protectedRoute';

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
    <div className='shadow-tight text-foreground bg-light-mode dark:bg-dark-mode flex h-screen flex-col bg-white bg-cover bg-center bg-no-repeat pr-16 pb-10 pl-8 bg-blend-screen'>
      <AppHeader />
      <div className='flex min-h-0 flex-1 gap-4'>
        <div className='flex min-h-0 flex-1 items-stretch gap-4'>
          <div className='flex min-h-0 flex-1 flex-col gap-4'>
            <div className='flex min-h-0 w-full flex-1 gap-8'>
              <AppSideBar />
              <div className='flex w-full flex-col gap-4'>
                <AppSubHeader />
                <div className='border-primary-400 bg-surface-50 h-full flex flex-col gap-3 overflow-hidden rounded-2xl border'>
                  <AppContent
                    fallback={
                      <div className='flex h-full items-center justify-center'>
                        <div
                          className={`${showDoc ? 'border-primary-400 bg-surface-50 shadow-theme-md border dark:bg-[rgba(4,66,92,0.60)]' : 'rounded-xl'} relative flex-1 overflow-hidden`}
                        />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            {showDoc && (
              <div className='mb-4 shrink-0'>
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
