import { createPaths } from '@core/routes';

export const SSOHRLinkPaths = createPaths('/sso', {
  login: '/login',
  loginByOtp: '/login-by-otp',
  oneTimePassword: '/otp',
  register: '/register',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
});
