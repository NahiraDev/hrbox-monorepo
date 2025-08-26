import type { PluginModule } from '../../../core';

import { SSOHRLinkRoutes } from '@module/sso/router';
import { SSOHRLinkApi } from '@module/sso/features/HRLink/apis';
import { reducers } from '@module/sso/reducers/rootReducer';

const SSOPlugin: PluginModule = {
  name: 'sso',
  reducers: reducers,
  apis: [SSOHRLinkApi as any],
  routes: SSOHRLinkRoutes,
};

export default SSOPlugin;
