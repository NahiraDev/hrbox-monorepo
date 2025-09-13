import type { PluginModule } from '../../../core';

import { SSOHRLinkApi } from '../features/HRLink/apis';

import { SSOHRLinkRoutes } from './routes';
import { HRLinkReducers } from './reducers';

const SSOPlugin: PluginModule = {
  name: 'sso',
  reducers: HRLinkReducers,
  apis: [SSOHRLinkApi as any],
  routes: SSOHRLinkRoutes.routes,
};

export default SSOPlugin;
