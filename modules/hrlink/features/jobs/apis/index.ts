import { createEndpoint, createPaginatedEndpoint } from '@hrbox/core/apis';
import { HRLinkApiEndpoints } from '@module/hrlink/app/endpoints';
import { HRLinkBaseApi } from '@module/hrlink/app/baseApiConfig';

export const JobsApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    jobOffers: createPaginatedEndpoint(build, HRLinkApiEndpoints.job.offers, 'GET', ['Jobs']),
    jobOpportunities: createPaginatedEndpoint(build, HRLinkApiEndpoints.job.opportunities, 'GET', ['Jobs']),
    jobDetail: createEndpoint(build, HRLinkApiEndpoints.job.offers, 'GET', ['Jobs']),
  }),
  overrideExisting: false,
});

export const { useLazyJobOffersQuery, useLazyJobDetailQuery, useLazyJobOpportunitiesQuery } = JobsApi;
