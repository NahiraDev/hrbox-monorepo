import createBaseApi from '../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../core';
import { HRLinkApiEndpoints } from '../../../app/endpoints.ts';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Jobs', [
  'Jobs',
] as const);

export const JobsApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    jobOffers: createEndpoint(build, HRLinkApiEndpoints.job.offers, 'GET', [
      'Jobs',
    ]),

    jobDetail: createEndpoint(build, HRLinkApiEndpoints.job.offers, 'GET', [
      'Jobs',
    ]),
    jobOpportunities: createEndpoint(
      build,
      HRLinkApiEndpoints.job.opportunities,
      'GET',
      ['Jobs'],
    ),
  }),
  overrideExisting: false,
});

export const {
  useJobOffersQuery,
  useJobDetailQuery,
  useJobOpportunitiesQuery,
} = JobsApi;
