import { createEndpoint } from '../../../../../core';
import { HRLinkApiEndpoints } from '../../../app/endpoints';
import { HRLinkBaseApi } from '../../../app/baseApiConfig';

export const DashboardApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    dashboard: createEndpoint(build, HRLinkApiEndpoints.dashboard.getData, 'GET', ['Dashboard']),
  }),
  overrideExisting: false,
});

export const { useLazyDashboardQuery } = DashboardApi;
