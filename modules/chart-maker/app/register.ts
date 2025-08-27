import type { PluginModule } from '../../../core';

import { convertMenuStructure } from '../../../core';

import { ChartMakerReducers } from './reducer';
import { getChartMakerMenuData } from './menu';
import { ChartMakerRoutes } from './routes';

const ChartMakerPlugin: PluginModule = {
  name: 'chart-maker',
  reducers: ChartMakerReducers,
  apis: [],
  routes: ChartMakerRoutes.routes,
  menu: convertMenuStructure(getChartMakerMenuData()),
};

export default ChartMakerPlugin;
