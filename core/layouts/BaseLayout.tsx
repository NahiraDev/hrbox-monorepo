import { serviceRegistry } from 'core/helpers';
import { useLocation } from 'react-router-dom';

import { AppSupportButton, AppSideBar } from '../components';
import { AppDocs, AppHeader } from '../sections';

export const BaseLayout = ({ props }: { props: any }) => {
  const { children } = props;
  const { pathname } = useLocation();
  const activeMenu = serviceRegistry.getActiveMenu(pathname);

  return (
    <div className="flex flex-col gap-[26px] shadow-tight h-[100vh] pr-16 pl-8">
      <AppHeader />
      <div className="flex flex-col h-[calc(100vh-132px)] gap-4">
        <div className="flex gap-4 h-full min-h-fit">
          <AppSideBar menu={activeMenu} />
          <div className="flex-1 min-h-fit h-full">{children}</div>
        </div>
        <div className="flex flex-col w-full justify-end">
          <AppDocs />
        </div>
        <div />
        <AppSupportButton />
      </div>
    </div>
  );
};
