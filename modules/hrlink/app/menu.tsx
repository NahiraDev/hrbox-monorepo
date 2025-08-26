import { type MenuStructure, useMenu } from '../../../core';
import { JobOffersIcon } from '../icons';
import { wrapIcons } from '../../../core';

import { HRLinkPaths } from './paths';

const MenuIcons = wrapIcons({
  offers: JobOffersIcon,
  detail: JobOffersIcon,
  opportunities: JobOffersIcon,
});

export const HRLinkMenu = () => {
  return useMenu('hrlink', HRLinkPaths.routes, MenuIcons);
};


export const getHRLinkMenuData = (): MenuStructure => {
  const moduleName = 'hrlink';
  const paths = HRLinkPaths.routes;

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
