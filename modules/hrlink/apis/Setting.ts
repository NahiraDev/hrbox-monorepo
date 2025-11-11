import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const settingApi = createModuleApi({
  reducerPath: 'settingApi',
  baseUrl: 'https://hrlink.hrbox.me:50443',
  tagTypes: ['Setting'],
  requiresAuth: true,
  autoToast: true,
});

export const settingApiWithEndpoints = settingApi.injectEndpoints({
  endpoints: (build) => ({
    // GET: اطلاعات پروفایل کاربر
    fetchProfile: createQuery<any>(build, {
      url: HRLinkApiEndpoints.profile.getInfo,
      method: 'GET',
      tags: ['Setting'],
    }),

    fetchGeneralSetting: createQuery<any>(build, {
      url: HRLinkApiEndpoints.profile.getSettings,
      method: 'GET',
      tags: ['Setting'],
    }),

    changePassword: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.changePassword,
      method: 'POST',
      tags: ['Setting'],
      invalidatesTags: ['Setting'],
    }),

    editProfile: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.edit,
      method: 'POST',
      tags: ['Setting'],
      invalidatesTags: ['Setting'],
    }),

    editGeneralSetting: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.editSettings,
      method: 'POST',
      tags: ['Setting'],
      invalidatesTags: ['Setting'],
    }),
  }),
});

// هوک‌های صحیح و استاندارد
export const {
  useFetchProfileQuery,
  useFetchGeneralSettingQuery,
  useChangePasswordMutation,
  useEditProfileMutation,
  useEditGeneralSettingMutation,
} = settingApiWithEndpoints;