import { lazyLoad } from '../../../core';
import { createPaths, createProjectRoutes } from '../../../core';

export const login = lazyLoad(
  () => import('../features/HRLink/Login.tsx'),
);
export const SSOLoginByOtpHRLink = lazyLoad(
  () => import('../features/HRLink/LoginByOtp.tsx'),
);
export const SSORegisterHRLink = lazyLoad(
  () => import('../features/HRLink/Register.tsx'),
);

export const SSOOneTimePasswordHRLink = lazyLoad(
  () => import('../features/HRLink/OneTimePassword.tsx'),
);
export const SSOForgetPasswordHRLink = lazyLoad(
  () => import('../features/HRLink/ForgetPassword.tsx'),
);
export const SSOResetPasswordHRLink = lazyLoad(
  () => import('../features/HRLink/ResetPassword.tsx'),
);
export const SSOHRLinkRoutes = createProjectRoutes('/sso', {
  login,
  SSOLoginByOtpHRLink,
  SSORegisterHRLink,
  SSOOneTimePasswordHRLink,
  SSOForgetPasswordHRLink,
  SSOResetPasswordHRLink,
});

export const SSOHRLinkPaths = createPaths('/sso', {
  Login: '/login',
  LoginByOtp: '/login-by-otp',
  OneTimePassword: '/otp',
  Register: '/register',
  ForgetPassword: '/forget-password',
  ResetPassword: '/reset-password',
});
