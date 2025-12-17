import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const educationApiEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build: any) => ({
    fetchEducations: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getList,
      tags: ['Education'],
    }),

    fetchEducationDetail: createQuery<any, { id: string | number }>(build, {
      url: HRLinkApiEndpoints.resume.education.getDetail,
      tags: ['Education'],
    }),

    fetchUniversity: createQuery<any, {type: number}>(build, {
      url: HRLinkApiEndpoints.resume.education.getUniversity,
      tags: ['Education'],
    }),

    fetchField: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getFieldOfStudy,
      tags: ['Education'],
    }),

    createEducation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.education.create,
      method: 'POST',
      tags: ['Education'],
    }),

    editEducation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.education.edit,
      method: 'PUT', 
      tags: ['Education'],
    }),

    deleteEducation: createMutation<any, { id: string | number }>(build, {
      url: HRLinkApiEndpoints.resume.education.delete,
      method: 'POST',
      tags: ['Education'],
    }),
  }),
});

export const {
  useFetchEducationsQuery,
  useFetchEducationDetailQuery,
  useFetchUniversityQuery,
  useFetchFieldQuery,
  useCreateEducationMutation,
  useEditEducationMutation,
  useDeleteEducationMutation,
} = educationApiEndpoints;