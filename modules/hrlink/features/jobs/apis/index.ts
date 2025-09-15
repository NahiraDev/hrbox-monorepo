import { createEndpoint, createPaginatedEndpoint } from '../../../../../core';
import { HRLinkApiEndpoints } from '../../../app/endpoints';
import { HRLinkBaseApi } from '../../../app/baseApiConfig';

export const JobsApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    jobOffers: createPaginatedEndpoint(build, HRLinkApiEndpoints.job.offers, 'GET', ['Jobs']),
    jobOpportunities: createPaginatedEndpoint(build, HRLinkApiEndpoints.job.opportunities, 'GET', ['Jobs']),
    jobDetail: createEndpoint(build, HRLinkApiEndpoints.job.offers, 'GET', ['Jobs']),
  }),
  overrideExisting: false,
});

export const { useLazyJobOffersQuery, useLazyJobDetailQuery, useLazyJobOpportunitiesQuery } = JobsApi;
