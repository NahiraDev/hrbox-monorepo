// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from 'react';
import type { ModulePlugin } from '@hrbox/modules/types';
import { RoleSlug } from '@hrbox/core/config/theme';
import { Profile, Briefcase, Building, PasswordCheck } from "iconsax-reactjs";
import { lazyRouteComponent } from '@tanstack/react-router';
import { Paths } from "@hrbox/modules/paths";
import { AttendancePath } from "@module/*";

// ============================================
// Pages
// ============================================

const Dashboard = lazyRouteComponent(() => import('./pages/dashboard/Dashboard'));
const EntryExit = lazyRouteComponent(() => import('./pages/registration/EntryExit'));
const AttendanceCalender = lazyRouteComponent(() => import('./pages/attendanceCalender/AttendanceCalenders'));
const TrafficCalender = lazyRouteComponent(() => import('./pages/attendanceCalender/TrafficCalender'));
const ExportPage = lazyRouteComponent(() => import('./pages/Export/ExportPage'));
const ListOfApprovals = lazyRouteComponent(() => import('./pages/ListApprovals/ListApprovals'));
const ShiftAllocation = lazyRouteComponent(() => import('./pages/Allocation/ShiftAllocation'));
const FaceAllocation = lazyRouteComponent(() => import('./pages/Allocation/FaceAllocation'));
const IpAllocation = lazyRouteComponent(() => import('./pages/Allocation/IpAllocation'));
const LocationAllocation = lazyRouteComponent(() => import('./pages/Allocation/LocationAllocation'));

// ============================================
// SubHeaders (Lazy Load)
// ============================================

const DashboardSubHeader = lazy(() => import('./subheaders/DashboardSubHeader'));
const EntryExitSubHeader = lazy(() => import('./subheaders/EntryExitSubHeader'));
const CalenderSubHeader = lazy(() => import('./subheaders/CalenderSubHeader'));
const ApprovalsSubHeader = lazy(() => import('./subheaders/ApprovalsSubHeader'));

// ============================================
// Plugin Definition
// ============================================

export const AttendancePlugin: ModulePlugin = {
  name: 'attendance',
  version: '1.0.0',
  basePath: '/attendance',
  layout: 'base',
  description: '',
  author: 'HRBox Team',

  // ============================================
  // Routes
  // ============================================
  routes: [
    {
      path: Paths.Attendance.Dashboard,
      component: Dashboard,
      layout: 'base',
      meta: {
        title: 'Dashboard',
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
    },

    {
      path: Paths.Attendance.EntryExitRegistration,
      component: EntryExit,
      layout: 'base',
      meta: {
        title: 'Entry Exit',
        requireAuth: true,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: EntryExitSubHeader,
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

  requiredRoles: [RoleSlug.ORGANIZATION],
  requiredPermissions: [],

  prefetch: async () => {
    console.log('Prefetching Attendance module...');
  },

  onModuleLoad: () => {
    console.log('HRLink module loaded');
  },

  onModuleUnload: () => {
    console.log('HRLink module unloaded');
  },
};

export default AttendancePlugin;