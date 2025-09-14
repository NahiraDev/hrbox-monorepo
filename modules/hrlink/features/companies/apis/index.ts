import { createEndpoint, createPaginatedEndpoint } from '../../../../../core';
import { HRLinkApiEndpoints } from '../../../app/endpoints';
import { HRLinkBaseApi } from '../../../app/baseApiConfig';

export const CompanyApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCompany: createPaginatedEndpoint(build, HRLinkApiEndpoints.company.getList, 'GET', ['Company']),
    fetchEvents: createPaginatedEndpoint(build, HRLinkApiEndpoints.company.getEvents, 'GET', ['Company']),
    fetchCompanyDetail: createEndpoint(build, HRLinkApiEndpoints.company.getDetail, 'GET', ['Company']),
    sendRequest: createEndpoint(build, HRLinkApiEndpoints.company.sendRequest, 'POST', ['Company']),
    followAndUnfollow: createEndpoint(build, HRLinkApiEndpoints.company.followOrUnfollow, 'POST', ['Company']),
  }),
  overrideExisting: false,
});

export const {
  useLazyFetchCompanyQuery,
  useLazyFetchEventsQuery,
  useLazyFetchCompanyDetailQuery,
  useSendRequestMutation,
  useFollowAndUnfollowMutation,
} = CompanyApi;
