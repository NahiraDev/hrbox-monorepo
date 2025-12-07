import { createModuleApi } from "@hrbox/core/apis/baseApi";
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@hrbox/modules/hrlink/app/endpoints";

const DashboardApi = createModuleApi({
  reducerPath: "dashboardApi",
  baseUrl: "https://hrlink.hrbox.me:50443/DesktopModules/Freelancer/api",
  tagTypes: ["Dashboard"],
  requiresAuth: true,
  autoToast: true,
});

export const dashboardApiEndpoints = DashboardApi.injectEndpoints({
  endpoints: (build: any) => ({
    fetchViewResume: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getViewResume,
      tags: ["Dashboard"],
    }),

    fetchResumePercent: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getResumePercent,
      tags: ["Dashboard"],
    }),

    fetchJobOpportunitiesSent: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getJobOpportunitiesSent,
      tags: ["Dashboard"],
    }),

    fetchCompaniesList: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getCompaniesList,
      tags: ["Dashboard"],
    }),

    fetchDashboardData: createQuery<any>(build, {
      url: HRLinkApiEndpoints.dashboard.getData,
      tags: ["Dashboard"],
    }),
  }),
});

export const {
  useFetchViewResumeQuery,
  useFetchResumePercentQuery,
  useFetchJobOpportunitiesSentQuery,
  useFetchCompaniesListQuery,
  useFetchDashboardDataQuery,
} = dashboardApiEndpoints;
