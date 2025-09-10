import createBaseApi from '../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../core';
import { HRLinkApiEndpoints } from '../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Company', ['Company'] as const);
console.log('🔥 BaseApi created:', {
  reducerPath: BaseApi.reducerPath,
  hasReducer: !!BaseApi.reducer,
  hasMiddleware: !!BaseApi.middleware
})
export const CompanyApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCompany: createEndpoint(build, HRLinkApiEndpoints.company.getList, 'GET', ['Company']),
    fetchCompanyDetail: createEndpoint(build, HRLinkApiEndpoints.company.getDetail, 'GET', ['Company']),
    sendRequest: createEndpoint(build, HRLinkApiEndpoints.company.sendRequest, 'POST', ['Company']),
    followAndUnfollow: createEndpoint(build, HRLinkApiEndpoints.company.followOrUnfollow, 'POST', ['Company']),
  }),
  overrideExisting: false,
});
console.log('🔥 CompanyApi created:', {
  reducerPath: CompanyApi.reducerPath,
  hasReducer: !!CompanyApi.reducer,
  hasMiddleware: !!CompanyApi.middleware,
  endpoints: Object.keys(CompanyApi.endpoints)
}); // Debug log

export const {
  useLazyFetchCompanyQuery,
  useLazyFetchCompanyDetailQuery,
  useSendRequestMutation,
  useFollowAndUnfollowMutation,
} = CompanyApi;
