import type { PluginModule } from '../../../core';

import { convertMenuStructure } from '../../../core';

import { ProcessMakerReducers } from './reducer';
import { getProcessMenuData } from './menu';
import { ProcessMakerRoutes } from './routes';

const ProcessMakerPlugin: PluginModule = {
  name: 'process-maker',
  reducers: ProcessMakerReducers,
  apis: [],
  routes: ProcessMakerRoutes.routes,
  menu: convertMenuStructure(getProcessMenuData()),
};

export default ProcessMakerPlugin;
