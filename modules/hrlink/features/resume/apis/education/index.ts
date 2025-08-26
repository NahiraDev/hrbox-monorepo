import createBaseApi from '../../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'AcademicHistory', [
  'AcademicHistory',
] as const);

export const EducationApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getList,
      'GET',
      ['AcademicHistory'],
    ),
    searchEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.search,
      'GET',
      ['AcademicHistory'],
    ),
    fetchEducationDetail: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getDetail,
      'GET',
      ['AcademicHistory'],
    ),
    fetchUniversity: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getUniversity,
      'GET',
      ['AcademicHistory'],
    ),
    fetchField: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.getField,
      'GET',
      ['AcademicHistory'],
    ),
    createEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.create,
      'POST',
      ['AcademicHistory'],
    ),
    editEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.edit,
      'POST',
      ['AcademicHistory'],
    ),
    deleteEducation: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.education.delete,
      'DELETE',
      ['AcademicHistory'],
    ),
  }),
  overrideExisting: false,
});

export const { useFetchEducationQuery , useSearchEducationQuery ,useFetchEducationDetailQuery,useFetchUniversityQuery , useFetchFieldQuery, useCreateEducationMutation , useEditEducationMutation , useDeleteEducationMutation } = EducationApi;
