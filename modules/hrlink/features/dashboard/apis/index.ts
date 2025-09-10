import createBaseApi from '../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../core';
import { HRLinkApiEndpoints } from '../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Dashboard', [
  'Dashboard',
] as const);

export const DashboardApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    dashboard: createEndpoint(
      build,
      HRLinkApiEndpoints.dashboard.getData,
      'GET',
      ['Dashboard'],
    ),
  }),
  overrideExisting: false,
});

export const { useLazyDashboardQuery } = DashboardApi;
