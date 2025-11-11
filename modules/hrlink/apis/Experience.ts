import { createEndpoint, createPaginatedEndpoint } from '@core/apis';
import { HRLinkApiEndpoints } from '@module/hrlink/app/endpoints';
import { HRLinkBaseApi } from '@module/hrlink/app/baseApiConfig';

export const ExperienceApi = HRLinkBaseApi.injectEndpoints({
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
