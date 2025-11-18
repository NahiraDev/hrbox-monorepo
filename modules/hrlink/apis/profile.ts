import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const profileApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Profile'],
  requiresAuth: true,
  autoToast: true,
});

export const profileApiEndpoints = profileApi.injectEndpoints({
  endpoints: (build: any) => ({
    // GET: Get profile information
    fetchProfileInfo: createQuery<any>(build, {
      url: HRLinkApiEndpoints.profile.getInfo,
      tags: ['Profile'],
    }),

    // PUT: Edit profile
    editProfile: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.edit,
      method: 'PUT',
      tags: ['Profile'],
    }),

    // POST: Change password
    changePassword: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.changePassword,
      method: 'POST',
      tags: ['Profile'],
    }),

    // GET: Fetch settings
    fetchSettings: createQuery<any>(build, {
      url: HRLinkApiEndpoints.profile.fetchSettings,
      tags: ['Profile'],
    }),

    // PUT: Edit settings
    editSettings: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.editSettings,
      method: 'PUT',
      tags: ['Profile'],
    }),

    // POST: Deactivate account
    deactivateAccount: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.deactivateAccount,
      method: 'POST',
      tags: ['Profile'],
    }),
  }),
});

export const {
  useFetchProfileInfoQuery,
  useEditProfileMutation,
  useChangePasswordMutation,
  useFetchSettingsQuery,
  useEditSettingsMutation,
  useDeactivateAccountMutation,
} = profileApiEndpoints;