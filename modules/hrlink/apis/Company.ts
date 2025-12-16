import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';


export const companyApiWithEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCompany: createQuery<any>(build, {
      url: HRLinkApiEndpoints.company.getList,
      tags: ['Company'],
    }),

    // GET: Company Events (Paginated)
    fetchEvents: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.company.getEvents,
      tags: ['Company'],
    }),

    // GET: Company Detail
    fetchCompanyDetail: createQuery<any, { id: string }>(build, {
      url: HRLinkApiEndpoints.company.getDetail,
      tags: ['Company'],
    }),

    // POST: Send Request to Company
    sendRequest: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.company.sendRequest,
      method: 'POST',
      tags: ['Company'],
    }),

    // POST: Follow or Unfollow Company
    followAndUnfollow: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.company.followOrUnfollow,
      method: 'POST',
      tags: ['Company'],
    }),
  }),
});

export const {
  useFetchCompanyQuery,
  useFetchEventsQuery,
  useFetchCompanyDetailQuery,
  useSendRequestMutation,
  useFollowAndUnfollowMutation,
} = companyApiWithEndpoints;