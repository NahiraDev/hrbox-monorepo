import { lazy } from 'react';
import type { ModulePlugin } from '@hrbox/modules/types';
import { RoleSlug } from '@core/config/design';

const LoginPage = lazy(() => import('./pages/Login'));
const SelectRolePage = lazy(() => import('./pages/SelectRole'));
const WelcomePage = lazy(() => import('./pages/Welcome'));

export const SSOPlugin: ModulePlugin = {
  name: 'sso',
  version: '1.0.0',
  basePath: '/sso',
  layout: 'auth',
  description: 'Authentication & Authorization Module',
  author: 'HRBox Team',

  // مسیرها
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
      layout: 'auth',
      meta: {
        title: 'Select Role',
        requireAuth: true,
      },
    },
    {
      path: '/sso/welcome',
      component: WelcomePage,
      layout: 'auth',
      meta: {
        title: 'Welcome',
        requireAuth: true,
      },
    },
  ],

  // ماژول قابل دسترس برای تمام نقش‌ها
  requiredRoles: [],
  requiredPermissions: [],

  // Prefetch
  prefetch: async () => {
    // بارگذاری اطلاعات اولیه
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
