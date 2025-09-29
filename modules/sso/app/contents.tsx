import { lazyLoad } from '@core/routes';
import { SSOHRLinkPaths } from '@module/sso/app/paths';

const Login = lazyLoad(() => import('@module/sso/features/HRLink/Login'));
const LoginByOtp = lazyLoad(() => import('@module/sso/features/HRLink/LoginByOtp'));
const Register = lazyLoad(() => import('@module/sso/features/HRLink/Register'));
const ForgetPassword = lazyLoad(() => import('@module/sso/features/HRLink/ForgetPassword'));
const ResetPassword = lazyLoad(() => import('@module/sso/features/HRLink/ResetPassword'));
const OneTimePassword = lazyLoad(() => import('@module/sso/features/HRLink/OneTimePassword'));

export const SSOContents: any = [
  {
    path: SSOHRLinkPaths.login,
    component: Login,
  },
  {
    path: SSOHRLinkPaths.loginByOtp,
    component: LoginByOtp,
  },
  {
    path: SSOHRLinkPaths.register,
    component: Register,
  },
  {
    path: SSOHRLinkPaths.forgetPassword,
    component: ForgetPassword,
  },
  {
    path: SSOHRLinkPaths.resetPassword,
    component: ResetPassword,
  },
  {
    path: SSOHRLinkPaths.oneTimePassword,
    component: OneTimePassword,
  },
];
