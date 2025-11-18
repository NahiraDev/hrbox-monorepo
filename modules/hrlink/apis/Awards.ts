import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const awardApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Award'],
  requiresAuth: true,
  autoToast: true,
});

export const awardApiEndpoints = awardApi.injectEndpoints({
  endpoints: (build:any) => ({

    createAward: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.award.create,
      method: 'POST',
      tags: ['Award'],
    }),

    editAward: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.award.edit,
      method: 'POST',
      tags: ['Award'],
    }),

    deleteAward: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.award.delete,
      method: 'DELETE',
      tags: ['Award'],
    }),

    fetchAwards: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.award.getList,
      tags: ['Award'],
    }),

    fetchAwardDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.award.getDetail,
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