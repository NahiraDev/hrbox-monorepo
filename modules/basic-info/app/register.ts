import { type PluginModule } from '../../../core';

import { BasicInfoRoutes } from './routes';
import { reducers } from './reducers';
import { BasicInfoMenu } from './menu';

const BasicInfoPlugin: PluginModule = {
  name: 'basic-info',
  reducers: reducers,
  apis: [],
  routes: BasicInfoRoutes.routes,
  menu: BasicInfoMenu(),
};

export default BasicInfoPlugin;
