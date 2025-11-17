import { HRLinkApiEndpoints } from '@module/hrlink/app/endpoints';
import { HRLinkBaseApi } from '@module/hrlink/app/baseApiConfig';

export const DashboardApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    dashboard: createEndpoint(build, HRLinkApiEndpoints.dashboard.getData, 'GET', ['Dashboard']),
  }),
  overrideExisting: false,
});

export const { useLazyDashboardQuery } = DashboardApi;

function createEndpoint(build: any, getData: string, arg2: string, arg3: string[]) {
  throw new Error('Function not implemented.');
}
