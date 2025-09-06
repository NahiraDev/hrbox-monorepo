import type { ReactNode } from 'react';

import {
  Briefcase,
  Building,
  Chart2,
  LocationAdd,
  Profile2User,
  ReceiveSquare,
  Setting3,
  Hierarchy3,
} from 'iconsax-react';

const MenuIcons = {
  dashboard: Chart2,
  departments: Building,
  locations: LocationAdd,
  employees: Profile2User,
  jobs: Briefcase,
  export: ReceiveSquare,
  setting: Setting3,
  processMaker: Hierarchy3,
};

export const BasicInfoMenu = (): { label: string; path: string; icon?: ReactNode }[] => {
  const moduleName = 'process-maker';
  const menuArray: { label: string; path: string; icon?: ReactNode }[] = [];

  const menuConfig: Record<string, string> = {
    Dashboard: '/Dashboard',
    Departments: '/OrganizationDepartments',
    Locations: '/OrganizationalLocations',
    Employees: '/PersonalInformation',
    setting: '/Setting',
    processMaker: '/process-maker',
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
