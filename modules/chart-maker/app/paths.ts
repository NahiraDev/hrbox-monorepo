import { createPaths } from '@core/routes';

export const ChartMakerPaths = createPaths('/chart-maker', {
  charts: {
    list: '/list',
  },
});
