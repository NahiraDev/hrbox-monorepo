import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { AuthApiEndpoints } from "@module/sso/app/endpoints";

// Types
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    roles: UserRole[];
  };
}

interface UserRole {
  id: string;
  name: string;
  slug: string;a
  permissions: string[];
}

interface OtpRequest {
  email: string;
}

interface OtpVerifyRequest {
  email: string;
  otp: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface RoleSelectRequest {
  roleId: string;
}

interface RoleSelectResponse {
  accessToken: string;
  selectedRole: UserRole;
}

const ssoApi = createModuleApi({
  reducerPath: 'ssoApi',
  baseUrl: '/api/auth',
  tagTypes: ['Auth'],
  requiresAuth: false,
  autoToast: true,
});

export const ssoApiWithEndpoints = ssoApi.injectEndpoints({
  endpoints: (build) => ({
    login: createMutation<LoginResponse, LoginRequest>(build, {
      url: AuthApiEndpoints.loginApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Send OTP
    sendOtp: createMutation<{ message: string }, OtpRequest>(build, {
      url: AuthApiEndpoints.sendOtpApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Login with OTP
    loginByOtp: createMutation<LoginResponse, OtpVerifyRequest>(build, {
      url: AuthApiEndpoints.loginByOtp,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Register
    register: createMutation<{ message: string }, RegisterRequest>(build, {
      url: AuthApiEndpoints.registerApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Register OTP Confirm
    registerOtpConfirm: createMutation<LoginResponse, OtpVerifyRequest>(build, {
      url: AuthApiEndpoints.registerOtpConfirmApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Reset password - Send OTP
    resetPasswordSendOtp: createMutation<{ message: string }, OtpRequest>(build, {
      url: AuthApiEndpoints.resetPasswordCheckOtpApi,
      method: 'POST',
      tags: ['Auth'],
    }),

    // Reset password - Verify OTP
    resetPasswordVerifyOtp: createMutation<{ token: string }, OtpVerifyRequest>(build, {
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
    selectRole: createMutation<RoleSelectResponse, RoleSelectRequest>(build, {
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
