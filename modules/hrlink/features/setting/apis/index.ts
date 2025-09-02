import createBaseApi from '../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../core';
import { HRLinkApiEndpoints } from '../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Setting', [
  'Setting',
] as const);

export const SettingApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchProfile: createEndpoint(
      build,
      HRLinkApiEndpoints.profile.getInfo,
      'GET',
      ['Setting'],
    ),
    fetchGeneralSetting: createEndpoint(
      build,
      HRLinkApiEndpoints.profile.getInfo,
      'GET',
      ['Setting'],
    ),
    changePassword: createEndpoint(
      build,
      HRLinkApiEndpoints.profile.changePassword,
      'POST',
      ['Setting'],
    ),

    editProfile: createEndpoint(
      build,
      HRLinkApiEndpoints.profile.edit,
      'POST',
      ['Setting'],
    ),

    editGeneralSetting: createEndpoint(
      build,
      HRLinkApiEndpoints.profile.editSettings,
      'POST',
      ['Setting'],
    ),
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
