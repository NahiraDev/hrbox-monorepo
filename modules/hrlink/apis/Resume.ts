import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from '@hrbox-monorepo/modules/hrlink/app/endpoints';

const ResumeApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api/User/',
  tagTypes: ['ResumeInformation'],
  requiresAuth: true,
  autoToast: true,
});

// this are the endpoints that i will cal for getting all of resume information
export const resumeApiEndpoints = ResumeApi.injectEndpoints({
      endpoints: (build:any) => ({
        fetchProfileInfo: createQuery<any>(build, {
          url: HRLinkApiEndpoints.job.offers,
          tags: ['Jobs'],
        }),
      }),
})

export const {
  useLazyFetchProfileInfoQuery,
} = resumeApiEndpoints;