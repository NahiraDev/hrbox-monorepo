import { createEndpoint, createPaginatedEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';
import { HRLinkBaseApi } from '../../../../app/baseApiConfig';

export const EducationApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchEducation: createPaginatedEndpoint(build, HRLinkApiEndpoints.resume.education.getList, 'GET', ['Education']),
    fetchEducationDetail: createEndpoint(build, HRLinkApiEndpoints.resume.education.getDetail, 'GET', ['Education']),
    fetchUniversity: createEndpoint(build, HRLinkApiEndpoints.resume.education.getUniversity, 'GET', ['Education']),
    fetchField: createEndpoint(build, HRLinkApiEndpoints.resume.education.getField, 'GET', ['Education']),
    createEducation: createEndpoint(build, HRLinkApiEndpoints.resume.education.create, 'POST', ['Education']),
    editEducation: createEndpoint(build, HRLinkApiEndpoints.resume.education.edit, 'POST', ['Education']),
    deleteEducation: createEndpoint(build, HRLinkApiEndpoints.resume.education.delete, 'DELETE', ['Education']),
  }),
  overrideExisting: false,
});

export const {
  useLazyFetchEducationQuery,
  useFetchEducationDetailQuery,
  useLazyFetchUniversityQuery,
  useFetchFieldQuery,
  useCreateEducationMutation,
  useEditEducationMutation,
  useDeleteEducationMutation,
} = EducationApi;
