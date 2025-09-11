import createBaseApi from '../../../../../../core/apis/baseApi';
import { createEndpoint, createPaginatedEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Experience', ['Experience'] as const);

export const ExperienceApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchExperience: createPaginatedEndpoint(build, HRLinkApiEndpoints.resume.experience.getList, 'GET', [
      'Experience',
    ]),
    fetchExperienceDetail: createEndpoint(build, HRLinkApiEndpoints.resume.experience.getDetail, 'GET', ['Experience']),
    editExperience: createEndpoint(build, HRLinkApiEndpoints.resume.experience.edit, 'PUT', ['Experience']),
    createExperience: createEndpoint(build, HRLinkApiEndpoints.resume.experience.create, 'PUT', ['Experience']),
    deleteExperience: createEndpoint(build, HRLinkApiEndpoints.resume.education.delete, 'DELETE', ['Experience']),
  }),
  overrideExisting: false,
});

export const {
  useLazyFetchExperienceQuery,
  useLazyFetchExperienceDetailQuery,
  useCreateExperienceMutation,
  useEditExperienceMutation,
  useDeleteExperienceMutation,
} = ExperienceApi;
