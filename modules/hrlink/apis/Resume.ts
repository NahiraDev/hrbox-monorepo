import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from '@hrbox/modules/hrlink/app/endpoints';
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const resumeApiEndpoints = HRLinkApi.injectEndpoints({
      endpoints: (build:any) => ({
        fetchProfileInfo: createQuery<any>(build, {
          url: HRLinkApiEndpoints.profile.getInfo,
          tags: ['Profile'],
        }),
        getProfilePhoto: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getProfileAvatar,
          tags: ['Profile'],
        }),
      }),
})

export const {
  useFetchProfileInfoQuery,
  useGetProfilePhotoQuery
} = resumeApiEndpoints;