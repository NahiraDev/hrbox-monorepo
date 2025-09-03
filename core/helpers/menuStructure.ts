import type { ReactNode } from 'react';

export type MenuItem = { name: string; route: string; icon: ReactNode };
export type MenuStructure = Record<string, Record<string, MenuItem>>;
export const convertMenuStructure = (
  menuData: MenuStructure,
): { label: string; path: string; icon?: ReactNode }[] => {
  const result: { label: string; path: string; icon?: ReactNode }[] = [];

  for (const [feature, items] of Object.entries(menuData)) {
    const featureItems = Object.values(items);
    if (featureItems.length > 0) {
      const firstItem = featureItems[0];
      result.push({
        label: firstItem.name,
        path: firstItem.route,
        icon: firstItem.icon,
      });
    }
  }

  return result;
};
