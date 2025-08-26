import type { PluginModule } from '../../../core';

import { HRLinkReducers } from '@module/hrlink/app/reducer';
import { convertMenuStructure } from '../../../core/helpers/menuStructure';

import { HRLinkMenu } from './menu';
import { HRLinkRoutes } from './routes';

const HRLinkPlugin: PluginModule = {
  name: 'hrlink',
  reducers: HRLinkReducers,
  apis: [],
  routes: HRLinkRoutes.routes,
  menu: convertMenuStructure(HRLinkMenu()),
};

export default HRLinkPlugin;
