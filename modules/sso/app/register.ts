import type { PluginModule } from '@core/helpers';

import { SSOHRLinkApi } from 'modules/sso/features/apis';
import { SSOHRLinkRoutes } from '@module/sso/app/routes';
import { HRLinkReducers } from '@module/sso/app/reducers';
import { SSOContents } from '@module/sso/app/contents';

const SSOPlugin: PluginModule = {
  name: 'sso',
  reducers: HRLinkReducers,
  apis: [SSOHRLinkApi as any],
  routes: SSOHRLinkRoutes.routes,
  contents: SSOContents
};

export default SSOPlugin;
