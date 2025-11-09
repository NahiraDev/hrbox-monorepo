import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { awardApiEndpoints } from "~/hrbox-monorepo/modules/hrlink/apis/Awards";



export const companyApiEndpoints = awardApiEndpoints.injectEndpoints({
  endpoints: (build:any) => ({
    fetchCompany: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.company.getList,
      tags: ['Company'],
    }),

    fetchEvents: createPaginatedQuery<Event>(build, {
      url: HRLinkApiEndpoints.company.getEvents,
      tags: ['Company'],
    }),

    fetchCompanyDetail: createQuery<Company, { id: string }>(build, {
      url: HRLinkApiEndpoints.company.getDetail,
      tags: ['Company'],
    }),

    sendRequest: createMutation<any, SendRequestRequest>(build, {
      url: HRLinkApiEndpoints.company.sendRequest,
      method: 'POST',
      tags: ['Company'],
    }),

    followAndUnfollow: createMutation<any, FollowUnfollowRequest>(build, {
      url: HRLinkApiEndpoints.company.followOrUnfollow,
      method: 'POST',
      tags: ['Company'],
    }),
  }),
});

export const {
  useLazyFetchCompanyQuery,
  useLazyFetchEventsQuery,
  useLazyFetchCompanyDetailQuery,
  useSendRequestMutation,
  useFollowAndUnfollowMutation,
} = hrlinkApiWithEndpoints;