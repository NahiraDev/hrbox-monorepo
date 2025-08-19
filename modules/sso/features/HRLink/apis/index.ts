import createBaseApi from 'core/apis/baseApi';
import { createEndpoint } from 'core';

import { ApiEndpointsHRLink } from './endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'SSOHRLink', [
  'SSOHRLink',
] as const);

export const SSOHRLinkApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: createEndpoint(build, ApiEndpointsHRLink.loginApi, 'POST', [
      'SSOHRLink',
    ]),

    sendOtp: createEndpoint(build, ApiEndpointsHRLink.sendOtpApi, 'POST', [
      'SSOHRLink',
    ]),
    resetPasswordCheckOtp: createEndpoint(
      build,
      ApiEndpointsHRLink.resetPasswordCheckOtpApi,
      'POST',
      ['SSOHRLink'],
    ),
    loginByOtp: createEndpoint(build, ApiEndpointsHRLink.loginByOtp, 'POST', [
      'SSOHRLink',
    ]),
    registerUser: createEndpoint(
      build,
      ApiEndpointsHRLink.registerApi,
      'POST',
      ['SSOHRLink'],
    ),
    registerOtpConfirm: createEndpoint(
      build,
      ApiEndpointsHRLink.registerOtpConfirmApi,
      'POST',
      ['SSOHRLink'],
    ),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useResetPasswordCheckOtpMutation,
  useLoginByOtpMutation,
  useRegisterUserMutation,
  useRegisterOtpConfirmMutation,
} = SSOHRLinkApi;
