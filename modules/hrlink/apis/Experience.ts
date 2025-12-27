import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const experienceApiEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build: any) => ({
    createExperience: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.experience.create,
      method: 'POST',
      tags: ['Experience'],
    }),

    fetchExperiences: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.getList,
      tags: ['Experience'],
    }),

    fetchExperienceDetail: createQuery<any, {id: number}>(build, {
      url: HRLinkApiEndpoints.resume.experience.getDetail,
      tags: ['Experience'],
    }),

    editExperience: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.experience.edit,
      method: 'PUT',
      tags: ['Experience'],
    }),

    deleteExperience: createMutation<any, {id: number}>(build, {
      url: HRLinkApiEndpoints.resume.experience.delete,
      method: 'DELETE',
      tags: ['Experience'],
    }),

    fetchTypeOfActivity: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.typeOfActivity,
      tags: ['Experience'],
    }),

    fetchReasonsToQuit: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.reasonToQuite,
      tags: ['Experience'],
    }),
  }),
});

export const {
  useFetchExperiencesQuery,
  useFetchExperienceDetailQuery,
  useCreateExperienceMutation,
  useEditExperienceMutation,
  useDeleteExperienceMutation,
  useFetchTypeOfActivityQuery,
  useFetchReasonsToQuitQuery,
} = experienceApiEndpoints;