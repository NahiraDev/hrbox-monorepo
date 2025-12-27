import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const profileApiEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build: any) => ({
    fetchProfileInfo: createQuery<any, any>(build, {
      url: HRLinkApiEndpoints.profile.getInfo,
      tags: ['Profile'],
    }),

    editProfile: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.edit,
      method: 'PUT',
      tags: ['Profile'],
    }),

    changePassword: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.changePassword,
      method: 'POST',
      tags: ['Profile'],
    }),

    fetchSettings: createQuery<any, any>(build, {
      url: HRLinkApiEndpoints.profile.fetchSettings,
      tags: ['Profile'],
    }),

    editSettings: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.editSettings,
      method: 'PUT',
      tags: ['Profile'],
    }),

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