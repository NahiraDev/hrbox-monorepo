import type { MenuStructure } from '../hooks/useMenu';
import type { ReactNode } from 'react';

export const convertMenuStructure = (
  menuData: MenuStructure,
): Record<string, { label: string; path: string; icon?: ReactNode }[]> => {
  const result: Record<
    string,
    { label: string; path: string; icon?: ReactNode }[]
  > = {};

  for (const [feature, items] of Object.entries(menuData)) {
    result[feature] = Object.values(items).map((item) => ({
      label: item.name,
      path: item.route,
      icon: item.icon,
    }));
  }

  return result;
};
