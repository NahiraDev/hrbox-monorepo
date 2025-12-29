import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const companyApiWithEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCompany: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.company.getList,
      tags: ['Company'],
    }),

    fetchEvents: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.company.getEvents,
      tags: ['Company'],
    }),

    fetchCompanyDetail: createQuery<any, { id: string }>(build, {
      url: HRLinkApiEndpoints.company.getDetail,
      tags: ['Company'],
    }),

    sendRequest: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.company.sendRequest,
      method: 'POST',
      tags: ['Company'],
    }),

    followAndUnfollow: createMutation<any, {Orgid: number}>(build, {
      url: HRLinkApiEndpoints.company.followOrUnfollow,
      method: 'POST',
      tags: ['Company'],
    }),

    lookingForJobSituations: createPaginatedQuery<any>(build,{
      url: HRLinkApiEndpoints.company.lookingForJobSituations,
      method: 'GET',
      tags: ['Company'],
    }),

    getCompanyScore: createQuery<any, {orgid: number}> (build, {
      url: HRLinkApiEndpoints.company.getCompanyScore,
      method: 'GET',
      tags: ['Company'],
    }),

    // i dont know why teh endpoint is like this
    getEasyApply: createQuery<any, {orgid: number}>(build, {
      url: HRLinkApiEndpoints.company.easyApply,
      method: 'GET',
      tags: ['Company'],
    }),

    getOrgOffer: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.company.orgOffer,
      method: 'GET',
      tags: ['Company'],
    }),

    // DO NOT USE THIS ENDPOINT IT RETURNS ALL OF THE COMPANIES
    getAllCompanies: createQuery<any>(build, {
      url: HRLinkApiEndpoints.company.allCompany,
      method: 'GET',
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
  useLookingForJobSituationsQuery,
  useGetCompanyScoreQuery,
  useGetEasyApplyQuery,
  useGetOrgOfferQuery,
} = companyApiWithEndpoints;