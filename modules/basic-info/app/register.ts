import type { PluginModule } from '../../../core';

import { reducers } from './index.ts';
import { BasicInfoRoutes } from './index.ts';

const BasicInfoPlugin: PluginModule = {
  name: 'basic-info',
  reducers: { basicInfo: reducers },
  apis: [],
  routes: BasicInfoRoutes,
};

export default BasicInfoPlugin;
