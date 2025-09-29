import { createEndpoint } from '@core/apis';
import { HRLinkApiEndpoints } from '@module/hrlink/app/endpoints';
import { HRLinkBaseApi } from '@module/hrlink/app/baseApiConfig';


export const AwardApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAwards: createEndpoint(build, HRLinkApiEndpoints.resume.award.getList, 'GET', ['Award']),
    fetchAwardDetail: createEndpoint(build, HRLinkApiEndpoints.resume.award.getDetail, 'GET', ['Award']),
    createAward: createEndpoint(build, HRLinkApiEndpoints.resume.award.create, 'POST', ['Award']),
    editAward: createEndpoint(build, HRLinkApiEndpoints.resume.award.edit, 'POST', ['Award']),
    deleteAward: createEndpoint(build, HRLinkApiEndpoints.resume.award.delete, 'DELETE', ['Award']),
  }),
  overrideExisting: false,
});

export const {
  useLazyFetchAwardsQuery,
  useLazyFetchAwardDetailQuery,
  useCreateAwardMutation,
  useEditAwardMutation,
  useDeleteAwardMutation,
} = AwardApi;
