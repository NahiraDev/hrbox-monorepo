import type { PluginModule } from '../../../core';

import { ProcessMakerReducers } from './reducer';
import { ProcessMakerRoutes } from './routes';
import { ProcessMakerContents } from './contents';
import { ProcessMakerSubHeaders } from './subHeaders';
import { ProcessMakerMenu } from './menu';

const ProcessMakerPlugin: PluginModule = {
  name: 'process-maker',
  reducers: ProcessMakerReducers,
  apis: [],
  routes: ProcessMakerRoutes.routes,
  contents: ProcessMakerContents,
  subHeaders: ProcessMakerSubHeaders,
  menu: ProcessMakerMenu(),
};

export default ProcessMakerPlugin;
