import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { AuthApiEndpoints } from "@hrbox-monorepo/modules/sso/apis/endpoints";


const ssoApi = createModuleApi({
  reducerPath: 'ssoApi',
  baseUrl: 'https://hrlink.hrbox.me:50443/DesktopModules/SSO/api',
  tagTypes: ['Auth'],
  requiresAuth: false,
  autoToast: true,
});

export const ssoApiWithEndpoints = ssoApi.injectEndpoints({
  endpoints: (build) => ({
    login: createMutation<any, any>(build, {
      url: AuthApiEndpoints.loginApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    register: createMutation<any, any>(build, {
      url: AuthApiEndpoints.registerApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Send OTP
    sendOtp: createMutation<{ message: string }, any>(build, {
      url: AuthApiEndpoints.sendOtpApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Login with OTP
    loginByOtp: createMutation<any, any>(build, {
      url: AuthApiEndpoints.loginByOtp,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Register
    register: createMutation<any, any>(build, {
      url: AuthApiEndpoints.registerApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Register OTP Confirm
    registerOtpConfirm: createMutation<any, any>(build, {
      url: AuthApiEndpoints.registerOtpConfirmApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Reset password - Send OTP
    resetPasswordSendOtp: createMutation<any, any>(build, {
      url: AuthApiEndpoints.resetPasswordCheckOtpApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Reset password - Verify OTP
    resetPasswordVerifyOtp: createMutation<any, any>(build, {
      url: AuthApiEndpoints.resetPasswordByGuidCodeApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    getRoleList: createQuery<any>(build, {
      url: AuthApiEndpoints.getRoleList,
      method: 'GET',
      tags: ['Auth'],
    }),

    // Select Role (after login)
    selectRole: createMutation<any, any>(build, {
      url: '/select-role',
      method: 'POST',
      tags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useLoginByOtpMutation,
  useRegisterMutation,
  useRegisterOtpConfirmMutation,
  useResetPasswordSendOtpMutation,
  useResetPasswordVerifyOtpMutation,
  useLazyGetRoleListQuery,
  useSelectRoleMutation,
} = ssoApiWithEndpoints;
