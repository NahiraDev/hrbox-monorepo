import type { PluginModule } from '../../../core';

import { BasicInfoRoutes } from './routes';
import { reducers } from './reducers';

const BasicInfoPlugin: PluginModule = {
  name: 'basic-info',
  reducers: reducers,
  apis: [],
  routes: BasicInfoRoutes.routes,
};

export default BasicInfoPlugin;
