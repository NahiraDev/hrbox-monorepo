import type { PluginModule } from '../../../core';

import { convertMenuStructure } from '../../../core';

import { HRLinkReducers } from './reducer';
import { getHRLinkMenuData } from './menu';
import { HRLinkRoutes } from './routes';

const HRLinkPlugin: PluginModule = {
  name: 'hrlink',
  reducers: HRLinkReducers,
  apis: [],
  routes: HRLinkRoutes.routes,
  menu: convertMenuStructure(getHRLinkMenuData()),
};

export default HRLinkPlugin;
