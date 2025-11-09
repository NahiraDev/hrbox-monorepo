import { lazy } from 'react';
import type { ModulePlugin } from '@hrbox/modules/types';
import { RoleSlug } from '@core/config/design';
import { Profile, Briefcase, Building } from 'iconsax-react';
import { lazyRouteComponent } from "@tanstack/react-router";

const DashboardPage = lazyRouteComponent(() => import('./pages/Dashboard'));
const ResumePage = lazyRouteComponent(() => import('./pages/Resume'));
const JobsPage = lazyRouteComponent(() => import('./pages/Jobs'));
const CompanyPage = lazyRouteComponent(() => import('./pages/Company'));

export const HRLinkPlugin: ModulePlugin = {
  name: 'hrlink',
  version: '1.0.0',
  basePath: '/hrlink',
  layout: 'base',
  description: 'Job Seeker Portal',
  author: 'HRBox Team',

  // مسیرها
  routes: [
    {
      path: '/hrlink/dashboard',
      component: DashboardPage,
      layout: 'base',
      meta: {
        title: 'Dashboard',
        requireAuth: true,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
    },
    {
      path: '/hrlink/resume',
      component: ResumePage,
      layout: 'base',
      meta: {
        title: 'Resume',
        requireAuth: true,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
    },
    {
      path: '/hrlink/jobs',
      component: JobsPage,
      layout: 'base',
      meta: {
        title: 'Jobs',
        requireAuth: true,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
    },
    {
      path: '/hrlink/company/:id',
      component: CompanyPage,
      layout: 'base',
      meta: {
        title: 'Company',
        requireAuth: true,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
    },
  ],

  // منو
  menu: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/hrlink/dashboard',
      icon: <Profile size="24" />,
    },
    {
      id: 'resume',
      label: 'Resume',
      path: '/hrlink/resume',
      icon: <Profile size="24" />,
    },
    {
      id: 'jobs',
      label: 'Jobs',
      path: '/hrlink/jobs',
      icon: <Briefcase size="24" />,
    },
    {
      id: 'company',
      label: 'Company',
      path: '/hrlink/company',
      icon: <Building size="24" />,
    },
  ],

  // محدود به کارجو
  requiredRoles: [RoleSlug.JOB_SEEKER],
  requiredPermissions: [],

  prefetch: async () => {
    console.log('Prefetching HRLink module...');
  },

  onModuleLoad: () => {
    console.log('HRLink module loaded');
  },

  onModuleUnload: () => {
    console.log('HRLink module unloaded');
  },
};

export default HRLinkPlugin;