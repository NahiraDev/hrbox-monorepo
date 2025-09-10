import type { ReactNode } from 'react';

import {
  Chart2,
  Personalcard,
} from 'iconsax-react';

const MenuIcons = {
  dashboard: Chart2,
  userInformation: Personalcard,
};

export const HRLinkMenu = (): { label: string; path: string; icon?: ReactNode }[] => {
  const moduleName = 'hrlink';
  const menuArray: { label: string; path: string; icon?: ReactNode }[] = [];

  const menuConfig: Record<string, string> = {
    Dashboard: '/Dashboard',
    userInformation: '/OrganizationDepartments',
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
