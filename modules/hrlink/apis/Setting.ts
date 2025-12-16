import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';


export const settingApiWithEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build) => ({
    // fetchProfile: createQuery<any>(build, {
    //   url: HRLinkApiEndpoints.profile.getInfo,
    //   method: 'GET',
    //   tags: ['Setting'],
    // }),

    fetchGeneralSetting: createQuery<any>(build, {
      url: HRLinkApiEndpoints.profile.fetchSettings,
      method: 'GET',
      tags: ['Setting'],
    }),

    // changePassword: createMutation<any, any>(build, {
    //   url: HRLinkApiEndpoints.profile.changePassword,
    //   method: 'POST',
    //   tags: ['Setting'],
    // }),

    // editProfile: createMutation<any, any>(build, {
    //   url: HRLinkApiEndpoints.profile.edit,
    //   method: 'POST',
    //   tags: ['Setting'],
    // }),

    editGeneralSetting: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.editSettings,
      method: 'POST',
      tags: ['Setting'],
    }),
  }),
});

export const {
  // useFetchProfileQuery,
  useFetchGeneralSettingQuery,
  // useChangePasswordMutation,
  // useEditProfileMutation,
  useEditGeneralSettingMutation,
} = settingApiWithEndpoints;