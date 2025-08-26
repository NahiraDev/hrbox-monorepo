import type { ReactNode, ComponentType } from 'react';

import { useLocation } from 'react-router-dom';

export type MenuItem = { name: string; route: string; icon: ReactNode };
export type MenuStructure = Record<string, Record<string, MenuItem>>;

export const useMenu = (
  moduleName: string,
  paths: Record<string, Record<string, string>>,
  iconMap: Record<string, ComponentType<any>>,
): MenuStructure => {
  const { pathname } = useLocation();

  const createMenu = (
    feature: string,
    pages: Record<string, string>,
  ): Record<string, MenuItem> => {
    const menu: Record<string, MenuItem> = {};

    for (const [pageKey, route] of Object.entries(pages)) {
      const Icon = iconMap[pageKey];

      menu[pageKey] = {
        name: pageKey,
        route: `/${moduleName}/${feature}${route}`,
        icon: (
          <Icon
            color={
              pathname === `/${moduleName}/${feature}${route}`
                ? '#FD1B51'
                : '#1E3363'
            }
          />
        ),
      };
    }

    return menu;
  };

  const menu: MenuStructure = {};

  for (const [feature, pages] of Object.entries(paths)) {
    menu[feature] = createMenu(feature, pages);
  }

  return menu;
};
