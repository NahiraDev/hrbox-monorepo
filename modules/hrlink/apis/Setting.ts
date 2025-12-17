import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';


export const settingApiWithEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build) => ({

    fetchGeneralSetting: createQuery<any>(build, {
      url: HRLinkApiEndpoints.profile.fetchSettings,
      method: 'GET',
      tags: ['Setting'],
    }),

    editGeneralSetting: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.profile.editSettings,
      method: 'POST',
      tags: ['Setting'],
    }),
  }),
});

export const {
  useFetchGeneralSettingQuery,
  useEditGeneralSettingMutation,
} = settingApiWithEndpoints;