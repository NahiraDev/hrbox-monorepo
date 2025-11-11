import type { ReactNode } from 'react';

import { Calendar2, Chart2, Key, PasswordCheck, ReceiveSquare2, Setting3 } from 'iconsax-reactjs';

const MenuIcons = {
  dashboard: Chart2,
  entryexitregistration: PasswordCheck,
  attendancecalenders: Calendar2,
  listofapprovals: Key,
  export: ReceiveSquare2,
  shiftallocation: Setting3,
};

export const AttendanceMenu = (): { label: string; path: string; icon?: ReactNode }[] => {
  const moduleName = 'attendance';
  const menuArray: { label: string; path: string; icon?: ReactNode }[] = [];

  const menuConfig: Record<string, string> = {
    Dashboard: '/dashboard',
    EntryExitRegistration: '/entry-exit',
    AttendanceCalenders: '/attendance-calender',
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
