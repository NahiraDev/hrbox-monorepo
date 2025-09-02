import { type MenuStructure, useMenu } from '../../../core';
import { JobOffersIcon } from '../icons';
import { wrapIcons } from '../../../core';

import { ProcessMakerRoutes } from './routes';

const MenuIcons = wrapIcons({
  offers: JobOffersIcon,
  detail: JobOffersIcon,
  opportunities: JobOffersIcon,
});

export const ProcessMakerMenu = () => {
  return useMenu('process-maker', ProcessMakerRoutes.routes, MenuIcons);
};


export const getProcessMenuData = (): MenuStructure => {
  const moduleName = 'processmaker';
  const paths = ProcessMakerRoutes.routes;

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
