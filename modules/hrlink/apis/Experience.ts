import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const experienceApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Experience'],
  requiresAuth: true,
  autoToast: true,
});

export const experienceApiEndpoints = experienceApi.injectEndpoints({
  endpoints: (build:any) => ({
    fetchExperiences: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.getList,
      tags: ['Experience'],
    }),

    fetchExperienceDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.getDetail,
      tags: ['Experience'],
    }),

    createExperience: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.experience.create,
      method: 'PUT',
      tags: ['Experience'],
    }),

    editExperience: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.experience.edit,
      method: 'PUT',
      tags: ['Experience'],
    }),

    deleteExperience: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.experience.delete,
      method: 'DELETE',
      tags: ['Experience'],
    }),
  }),
});

export const {
  useLazyFetchExperiencesQuery,
  useLazyFetchExperienceDetailQuery,
  useCreateExperienceMutation,
  useEditExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApiEndpoints;