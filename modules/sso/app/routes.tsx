import { lazyLoad } from 'core/index';
import { createProjectRoutes } from 'core/index';

import { SSOHRLinkPaths } from './paths';

export const page = {
  hrlink: {
    login: lazyLoad(() => import('../features/HRLink/Login')),
    LoginByOtp: lazyLoad(() => import('../features/HRLink/LoginByOtp')),
    register: lazyLoad(() => import('../features/HRLink/Register')),
    oneTimePassword: lazyLoad(() => import('../features/HRLink/OneTimePassword')),
    forgetPassword: lazyLoad(() => import('../features/HRLink/ForgetPassword')),
    resetPassword: lazyLoad(() => import('../features/HRLink/ResetPassword')),
  },
};

export const SSOHRLinkRoutes = createProjectRoutes('/sso', {
  [SSOHRLinkPaths.login]: page.hrlink.login,
  [SSOHRLinkPaths.loginByOtp]: page.hrlink.LoginByOtp,
  [SSOHRLinkPaths.register]: page.hrlink.login,
  [SSOHRLinkPaths.oneTimePassword]: page.hrlink.oneTimePassword,
  [SSOHRLinkPaths.forgetPassword]: page.hrlink.forgetPassword,
  [SSOHRLinkPaths.resetPassword]: page.hrlink.resetPassword,
});
