import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

export const page = {
  organizationChart: {
    list: lazyLoad(() => import('../features/OrganizationChartList')),
    chart: lazyLoad(() => import('../features/OrgChart')),
  },
};

export const ChartMakerRoutes = createProjectRoutes('/chart-maker', {
  organizationChartList: page.organizationChart.list,
  OrgChart: page.organizationChart.chart,
});
