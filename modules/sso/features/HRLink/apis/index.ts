import { createEndpoint } from '@core/apis';
import { ApiEndpointsHRLink } from '@module/sso/app/endpoints';
import { SSOHRLinkBaseApi } from '@module/sso/app/baseApiConfig';

export const SSOHRLinkApi = SSOHRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: createEndpoint(build, ApiEndpointsHRLink.loginApi, 'POST', ['SSOHRLink']),
    sendOtp: createEndpoint(build, ApiEndpointsHRLink.sendOtpApi, 'POST', ['SSOHRLink']),
    resetPasswordCheckOtp: createEndpoint(build, ApiEndpointsHRLink.resetPasswordCheckOtpApi, 'POST', ['SSOHRLink']),
    loginByOtp: createEndpoint(build, ApiEndpointsHRLink.loginByOtp, 'POST', ['SSOHRLink']),
    registerUser: createEndpoint(build, ApiEndpointsHRLink.registerApi, 'POST', ['SSOHRLink']),
    registerOtpConfirm: createEndpoint(build, ApiEndpointsHRLink.registerOtpConfirmApi, 'POST', ['SSOHRLink']),
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
