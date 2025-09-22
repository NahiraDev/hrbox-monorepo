import type { ReactNode } from 'react';

import { Chart2, Setting3, Hierarchy3 } from 'iconsax-react';

const MenuIcons = {
  dashboard: Chart2,
  processlist: Hierarchy3,
  setting: Setting3,
};

export const ProcessMakerMenu = (): { label: string; path: string; icon?: ReactNode }[] => {
  const moduleName = 'process-maker';
  const menuArray: { label: string; path: string; icon?: ReactNode }[] = [];

  const menuConfig: Record<string, string> = {
    Dashboard: '/dashboard',
    ProcessList: '/process-list',
    setting: '/setting',
  };

  Object.entries(menuConfig).forEach(([feature, route]) => {
    const iconKey = feature.toLowerCase() as keyof typeof MenuIcons;
    const IconComponent = MenuIcons[iconKey];

    menuArray.push({
      label: feature,
      path: `/${moduleName}${route}`,
      icon: IconComponent ? <IconComponent /> : null,
    });
  });

  return menuArray;
};
