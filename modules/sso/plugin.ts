import type { ModulePlugin } from '@hrbox/modules/types';
import { lazyRouteComponent } from "@tanstack/react-router";
import { AuthApiEndpoints } from "@hrbox/modules/sso/apis/endpoints";

const LoginPage = lazyRouteComponent(() => import('./pages/Login'));
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
      path: '/sso/login',
      component: LoginPage,
      layout: 'auth',
      meta: {
        title: 'Login',
        requireAuth: false,
      },
    },
    {
      path: '/sso/select-role',
      component: SelectRolePage,
      layout: 'base',
      meta: {
        title: 'Select Role',
        requireAuth: false,
      },
    },
    {
      path: '/sso/welcome',
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
