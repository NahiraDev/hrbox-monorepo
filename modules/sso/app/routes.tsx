import { lazyLoad , createProjectRoutes } from '@core/routes';

import { SSOHRLinkPaths } from './paths';

export const page = {
  hrlink: {
    login: lazyLoad(() => import('../features/Login')),
    LoginByOtp: lazyLoad(() => import('../features/LoginByOtp')),
    register: lazyLoad(() => import('../features/Register')),
    oneTimePassword: lazyLoad(() => import('../features/OneTimePassword')),
    forgetPassword: lazyLoad(() => import('../features/ForgetPassword')),
    resetPassword: lazyLoad(() => import('../features/ResetPassword')),
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
