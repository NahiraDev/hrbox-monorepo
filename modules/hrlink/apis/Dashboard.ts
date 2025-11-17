import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from '@hrbox-monorepo/modules/hrlink/app/endpoints';

const DashboardApi = createModuleApi({
  reducerPath: 'dashboardApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Dashboard'],
  requiresAuth: true,
  autoToast: true,
});

export const dashboardApiEndpoints = DashboardApi.injectEndpoints({
  endpoints: (build:any) => ({
    fetchViewResume: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getViewResume,
      tags: ['Dashboard'],
    }),
    fetchResumePercent: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getResumePercent,
      tags: ['Dashboard'],
    }),
    getJobOpportunitiesSent: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getJobOpportunitiesSent,
      tags: ['Dashboard'],
    }),
    getCompaniesList: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getCompaniesList,
      tags: ['Dashboard'],
    }),
  }),
})

export const {
  useFetchViewResumeQuery,
    useFetchResumePercentQuery,
    useGetJobOpportunitiesSentQuery,
    useGetCompaniesListQuery
} = dashboardApiEndpoints;