import { Setting3 } from 'iconsax-react';

import { type MenuStructure, useMenu } from '../../../core';
import { wrapIcons } from '../../../core';

import { ChartMakerPaths } from './paths';

const MenuIcons = wrapIcons({
  list: <Setting3 size="24" />,
});

export const ChartMakerMenu = () => {
  return useMenu('chart-maker', ChartMakerPaths.routes, MenuIcons);
};

export const getChartMakerMenuData = (): MenuStructure => {
  const moduleName = 'chart-maker';
  const paths = ChartMakerPaths.routes;

  const menu: MenuStructure = {};

  for (const [feature, pages] of Object.entries(paths)) {
    menu[feature] = {};
    for (const [pageKey, route] of Object.entries(pages)) {
      menu[feature][pageKey] = {
        name: pageKey,
        route: `/${moduleName}/${feature}${route}`,
        icon: null,
      };
    }
  }

  return menu;
};
