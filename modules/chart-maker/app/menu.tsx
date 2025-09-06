import type { ReactNode } from 'react';

import { Briefcase, Building, Chart2, Data2, LocationAdd, Profile2User, ReceiveSquare, Setting3 } from 'iconsax-react';

const MenuIcons = {
  dashboard: Chart2,
  departments: Building,
  locations: LocationAdd,
  employees: Profile2User,
  jobs: Briefcase,
  orgChart: Data2,
  export: ReceiveSquare,
  setting: Setting3,
};

export const ChartMakerMenu = (): { label: string; path: string; icon?: ReactNode }[] => {
  const moduleName = 'chart-maker';
  const menuArray: { label: string; path: string; icon?: ReactNode }[] = [];

  const menuConfig: Record<string, string> = {
    Dashboard: '/Dashboard',
    Departments: '/OrganizationDepartments',
    Locations: '/OrganizationalLocations',
    Employees: '/PersonalInformation',
    OrgChart: '/OrganizationChartList',
    setting: '/Setting',
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
