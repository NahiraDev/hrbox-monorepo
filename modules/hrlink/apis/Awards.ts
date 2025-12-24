import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';


export const awardApiEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build:any) => ({

    createAward: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.award.create,
      method: 'POST',
      tags: ['Award'],
    }),

    editAward: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.award.edit,
      method: 'PUT',
      tags: ['Award'],
    }),

    deleteAward: createMutation<any, { id: number }>(build, {
      url: HRLinkApiEndpoints.resume.award.delete,
      method: 'DELETE',
      tags: ['Award'],
    }),

    fetchAwards: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.award.getList,
      method: 'GET',
      tags: ['Award'],
    }),

    fetchAwardDetail: createQuery<any, { id: number }>(build, {
      url: HRLinkApiEndpoints.resume.award.getDetail,
      method: 'GET',
      tags: ['Award'],
    }),

  }),
});


export const {
  useFetchAwardsQuery,
  useFetchAwardDetailQuery,
  useCreateAwardMutation,
  useEditAwardMutation,
  useDeleteAwardMutation,
} = awardApiEndpoints;