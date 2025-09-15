import type { PluginModule } from '../../../core';

import { ChartMakerMenu } from './menu';
import { ChartMakerReducers } from './reducer';
import { ChartMakerRoutes } from './routes';

const ChartMakerPlugin: PluginModule = {
  name: 'chart-maker',
  reducers: ChartMakerReducers,
  apis: [],
  routes: ChartMakerRoutes.routes,
  menu: ChartMakerMenu(),
};

export default ChartMakerPlugin;
