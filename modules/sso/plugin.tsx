import type { ModulePlugin } from '@hrbox/modules/types';
import { lazyRouteComponent } from "@tanstack/react-router";
import { AuthApiEndpoints } from "@hrbox/modules/sso/apis/endpoints";
import {Paths} from "@hrbox/modules/paths";

const LoginPage = lazyRouteComponent(() => import('./pages/Login'));
const LoginByOtpPage = lazyRouteComponent(() => import('./pages/LoginByOtp'));
const RegisterPage = lazyRouteComponent(() => import('./pages/Register'));
const ForgetPasswordPage = lazyRouteComponent(() => import('./pages/ForgetPassword'));
const SelectRolePage = lazyRouteComponent(() => import('./pages/SelectRole'));
const WelcomePage = lazyRouteComponent(() => import('./pages/Welcome'));

export const SSOPlugin: ModulePlugin = {
  name: 'sso',
  version: '1.0.0',
  basePath: '/sso',
  layout: 'auth',
  description: 'Authentication & Authorization Module',
  author: 'HRBox Team',
  api:{
    baseUrl: 'https://hrlink.hrbox.me:50443',
    endpoints:AuthApiEndpoints,
  },
  routes: [
    {
      path: Paths.SSO.login,
      component: LoginPage,
      layout: 'auth',
      meta: {
        title: 'Login',
        requireAuth: false,
      },
    },

    {
      path: Paths.SSO.register,
      component: RegisterPage,
      layout: 'empty',
      meta: {
        title: 'Register',
        requireAuth: false,
      },
    },
    {
      path: Paths.SSO.loginByOtp,
      component: LoginByOtpPage,
      layout: 'auth',
      meta: {
        title: 'Login by Otp',
        requireAuth: false,
      },
    },
    {
      path: Paths.SSO.forgetPassword,
      component: ForgetPasswordPage,
      layout: 'auth',
      meta: {
        title: 'ForgetPassword',
        requireAuth: false,
      },
    },
    {
      path: Paths.SSO.SelectRole,
      component: SelectRolePage,
      layout: 'base',
      meta: {
        title: 'Select Role',
        requireAuth: true,
      },
    },
    {
      path: Paths.SSO.welcome,
      component: WelcomePage,
      layout: 'empty',
      meta: {
        title: 'Welcome',
        requireAuth: true,
      },
    },
  ],

  requiredRoles: [],
  requiredPermissions: [],

  prefetch: async () => {
    console.log('Prefetching SSO module...');
  },

  onModuleLoad: () => {
    console.log('SSO module loaded');
  },

  onModuleUnload: () => {
    console.log('SSO module unloaded');
  },
};

export default SSOPlugin;
