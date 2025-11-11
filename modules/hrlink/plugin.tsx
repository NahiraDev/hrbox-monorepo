// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from 'react';
import type { ModulePlugin } from '@hrbox/modules/types';
import { RoleSlug } from '@hrbox/core/config/theme';
import { Profile, Briefcase, Building } from 'iconsax-reactjs';
import { lazyRouteComponent } from '@tanstack/react-router';

// ============================================
// Pages
// ============================================

const DashboardPage = lazyRouteComponent(() => import('./pages/dashboard'));
const ResumePage = lazyRouteComponent(() => import('./pages/resume/Information'));
const JobsPage = lazyRouteComponent(() => import('./pages/jobs/JobOffers'));
const CompanyPage = lazyRouteComponent(() => import('./pages/companies/Companies'));

// ============================================
// SubHeaders (Lazy Load)
// ============================================

const DashboardSubHeader = lazy(() => import('./subheaders/DashboardSubHeader'));
const JobsSubHeader = lazy(() => import('./subheaders/JobsSubHeader'));
const ResumeSubHeader = lazy(() => import('./subheaders/JobsSubHeader'));

// ============================================
// Plugin Definition
// ============================================

export const HRLinkPlugin: ModulePlugin = {
  name: 'hrlink',
  version: '1.0.0',
  basePath: '/hrlink',
  layout: 'base',
  description: 'Job Seeker Portal',
  author: 'HRBox Team',

  // ============================================
  // Routes
  // ============================================
  routes: [
    {
      path: '/hrlink/dashboard',
      component: DashboardPage,
      layout: 'base',
      meta: {
        title: 'Dashboard',
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
    },

    {
      path: '/hrlink/resume',
      component: ResumePage,
      layout: 'base',
      meta: {
        title: 'Resume',
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
      subHeader: ResumeSubHeader,
    },

    // Jobs
    {
      path: '/hrlink/jobs',
      component: JobsPage,
      layout: 'base',
      meta: {
        title: 'Jobs',
        requireAuth: true,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
      subHeader: JobsSubHeader,
      subHeaderProps: {
        showFilters: true,
        showSearch: true,
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
      // ✅ این صفحه SubHeader نداره
    },
  ],

  // ============================================
  // Menu
  // ============================================
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