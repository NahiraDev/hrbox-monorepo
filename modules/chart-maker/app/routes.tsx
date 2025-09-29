import { lazyLoad , createProjectRoutes } from '@core/routes';

export const page = {
  organizationChart: {
    list: lazyLoad(() => import('@module/chart-maker/features/OrganizationChartList')),
    chart: lazyLoad(() => import('@module/chart-maker/features/OrgChart')),
  },
};

export const ChartMakerRoutes = createProjectRoutes('/chart-maker', {
  OrganizationChartList: page.organizationChart.list,
  OrgChart: page.organizationChart.chart,
});
