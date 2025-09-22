import { createEndpoint } from '@core/apis';
import { HRLinkApiEndpoints } from '@module/hrlink/app/endpoints';
import { HRLinkBaseApi } from '@module/hrlink/app/baseApiConfig';

export const SettingApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchProfile: createEndpoint(build, HRLinkApiEndpoints.profile.getInfo, 'GET', ['Setting']),
    fetchGeneralSetting: createEndpoint(build, HRLinkApiEndpoints.profile.getInfo, 'GET', ['Setting']),
    changePassword: createEndpoint(build, HRLinkApiEndpoints.profile.changePassword, 'POST', ['Setting']),

    editProfile: createEndpoint(build, HRLinkApiEndpoints.profile.edit, 'POST', ['Setting']),

    editGeneralSetting: createEndpoint(build, HRLinkApiEndpoints.profile.editSettings, 'POST', ['Setting']),
  }),
  overrideExisting: false,
});

export const {
  useFetchProfileQuery,
  useFetchGeneralSettingQuery,
  useChangePasswordMutation,
  useEditGeneralSettingMutation,
  useEditProfileMutation,
} = SettingApi;
