import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const educationApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Education'],
  requiresAuth: true,
  autoToast: true,
});

export const educationApiEndpoints = educationApi.injectEndpoints({
  endpoints: (build:any) => ({
    fetchEducations: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getList,
      tags: ['Education'],
    }),

    fetchEducationDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getDetail,
      tags: ['Education'],
    }),

    fetchUniversity: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getUniversity,
      tags: ['Education'],
    }),

    fetchField: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.education.getField,
      tags: ['Education'],
    }),

    createEducation: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.education.create,
      method: 'POST',
      tags: ['Education'],
    }),

    editEducation: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.education.edit,
      method: 'POST',
      tags: ['Education'],
    }),

    deleteEducation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.education.delete,
      method: 'DELETE',
      tags: ['Education'],
    }),
  }),
});

export const {
  useLazyFetchEducationsQuery,
  useLazyFetchEducationDetailQuery,
  useLazyFetchUniversityQuery,
  useLazyFetchFieldQuery,
  useCreateEducationMutation,
  useEditEducationMutation,
  useDeleteEducationMutation,
} = educationApiEndpoints;