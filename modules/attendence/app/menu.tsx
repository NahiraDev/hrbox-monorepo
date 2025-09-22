import type { ReactNode } from 'react';

import { Calendar2, Chart2, Key, PasswordCheck, ReceiveSquare2, Setting3 } from 'iconsax-react';

const MenuIcons = {
  dashboard: Chart2,
  entryexitregistration: PasswordCheck,
  trafficcalender: Calendar2,
  listofapprovals: Key,
  export: ReceiveSquare2,
  shiftallocation: Setting3,
};

export const AttendenceMenu = (): { label: string; path: string; icon?: ReactNode }[] => {
  const moduleName = 'attendence';
  const menuArray: { label: string; path: string; icon?: ReactNode }[] = [];

  const menuConfig: Record<string, string> = {
    Dashboard: '/dashboard',
    EntryExitRegistration: '/entry-exit',
    TrafficCalender: '/traffic-calender',
    ListOfApprovals: '/list-of-approvals',
    Export: '/export',
    ShiftAllocation: '/shift-allocation',
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
