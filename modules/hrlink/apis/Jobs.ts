import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const jobsApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Jobs'],
  requiresAuth: true,
  autoToast: true,
});

export const jobsApiEndpoints = jobsApi.injectEndpoints({
  endpoints: (build:any) => ({
    fetchJobOffers: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.job.offers,
      tags: ['Jobs'],
    }),

    fetchJobOpportunities: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.job.opportunities,
      tags: ['Jobs'],
    }),

    fetchJobDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.offers,
      tags: ['Jobs'],
    }),
  }),
});

export const {
  useLazyFetchJobOffersQuery,
  useLazyFetchJobOpportunitiesQuery,
  useLazyFetchJobDetailQuery,
} = jobsApiEndpoints;