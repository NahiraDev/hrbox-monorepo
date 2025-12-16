import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const educationApiEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build: any) => ({
    // Paginated query for listing all educations
    fetchEducations: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getList,
      tags: ['Education'],
    }),
    // Non-paginated query for a single education detail (assumes params like { id })
    fetchEducationDetail: createQuery<any, { id: string | number }>(build, {
      url: HRLinkApiEndpoints.resume.education.getDetail,
      tags: ['Education'],
    }),
    // Paginated query for universities (assumes it supports pagination/search params)
    fetchUniversity: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getUniversity,
      tags: ['Education'],
    }),
    // Assuming this is for fields of study; replace URL if incorrect
    fetchField: createPaginatedQuery<any>(build, {
      url: '/Education/GetField', // Guessed; update to actual endpoint if different
      tags: ['Education'],
    }),
    // Mutation for creating a new education
    createEducation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.education.create,
      method: 'POST',
      tags: ['Education'],
    }),
    // Mutation for editing an existing education
    editEducation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.education.edit,
      method: 'POST', // Or 'PUT' if your API uses PUT for updates
      tags: ['Education'],
    }),
    // Mutation for deleting an education
    deleteEducation: createMutation<any, { id: string | number }>(build, {
      url: HRLinkApiEndpoints.resume.education.delete,
      method: 'POST', // Or 'DELETE' if your API supports it
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