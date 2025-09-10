import createBaseApi from '../../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Award', [
  'Award',
] as const);

export const AwardApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAwards: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.award.getList,
      'GET',
      ['Award'],
    ),
    fetchAwardDetail: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.award.getDetail,
      'GET',
      ['Award'],
    ),
    createAward: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.award.create,
      'POST',
      ['Award'],
    ),
    editAward: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.award.edit,
      'POST',
      ['Award'],
    ),
    deleteAward: createEndpoint(
      build,
      HRLinkApiEndpoints.resume.award.delete,
      'DELETE',
      ['Award'],
    ),
  }),
  overrideExisting: false,
});

export const { useLazyFetchAwardsQuery , useLazyFetchAwardDetailQuery , useCreateAwardMutation , useEditAwardMutation , useDeleteAwardMutation } = AwardApi;
