import createBaseApi from '../../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Courses', [
  'Courses',
] as const);

export const CoursesApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getList,
      'GET',
      ['Courses'],
    ),
    searchEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.search,
      'GET',
      ['Courses'],
    ),
    fetchEducationDetail: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getDetail,
      'GET',
      ['Courses'],
    ),
    fetchUniversity: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getUniversity,
      'GET',
      ['Courses'],
    ),
    fetchField: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getField,
      'GET',
      ['Courses'],
    ),
    createEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.create,
      'POST',
      ['Courses'],
    ),
    editEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.edit,
      'POST',
      ['Courses'],
    ),
    deleteEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.delete,
      'DELETE',
      ['Courses'],
    ),
  }),
  overrideExisting: false,
});

export const { useFetchEducationQuery , useSearchEducationQuery ,useFetchEducationDetailQuery,useFetchUniversityQuery , useFetchFieldQuery, useCreateEducationMutation , useEditEducationMutation , useDeleteEducationMutation } = CoursesApi;
