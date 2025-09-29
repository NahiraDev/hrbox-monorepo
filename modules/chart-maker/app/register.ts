import type { PluginModule } from '@core/helpers';

import { ChartMakerMenu } from '@module/chart-maker/app/menu';
import { ChartMakerReducers } from '@module/chart-maker/app/reducer';
import { ChartMakerRoutes } from '@module/chart-maker/app/routes';

const ChartMakerPlugin: PluginModule = {
  name: 'chart-maker',
  reducers: ChartMakerReducers,
  apis: [],
  routes: ChartMakerRoutes.routes,
  menu: ChartMakerMenu(),
};

export default ChartMakerPlugin;
