import { lazyLoad } from '@core/routes';
import { SSOHRLinkPaths } from '@module/sso/app/paths';

const Login = lazyLoad(() => import('@module/sso/features/Login'));
const LoginByOtp = lazyLoad(() => import('@module/sso/features/LoginByOtp'));
const Register = lazyLoad(() => import('@module/sso/features/Register'));
const ForgetPassword = lazyLoad(() => import('@module/sso/features/ForgetPassword'));
const ResetPassword = lazyLoad(() => import('@module/sso/features/ResetPassword'));
const OneTimePassword = lazyLoad(() => import('@module/sso/features/OneTimePassword'));

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
