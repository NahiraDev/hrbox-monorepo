// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from "react";
import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import {  Chart, Setting2 } from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";


// ============================================
// Pages
// ============================================

const Dashboard = lazyRouteComponent(
  () => import("./pages/dashboard/Dashboard")
);
const Setting = lazyRouteComponent(
  () => import("./pages/setting/Setting")
);


// ============================================
// SubHeaders (Lazy Load)
// ============================================

const DashboardSubHeader = lazy(
  () => import("./subheaders/DashboardHeader")
);
const SettingSubHeader = lazy(
  () => import("./subheaders/SettingHeader")
);

// ============================================
// Plugin Definition
// ============================================

export const JobGradingsPlugins: ModulePlugin = {
  name: "jobgradings",
  version: "1.0.0",
  basePath: "/job-gradings",
  layout: "base",
  description: "",
  author: "HRBox Team",

  // ============================================
  // Routes
  // ============================================
  routes: [
    {
      path: Paths.JobGradings.Dashboard,
      component: Dashboard,
      layout: "base",
      meta: {
        title: "Dashboard",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: DashboardSubHeader,
      subHeaderProps:{
        title:"Dashboard",
        icon:<Chart/>
      }
    },
    {
      path: Paths.JobGradings.Setting,
      component: Setting,
      layout: "base",
      meta: {
        title: "Setting",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: SettingSubHeader,
      subHeaderProps:{
        title:"Indicators",
        icon:<Setting2/>
      }
    },
  ],
  // ============================================
  // Menu
  // ============================================
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/job-gradings/dashboard",
      icon: <Chart size="24" />,
    },
    {
      id: "setting",
      label: "Setting",
      path: "/job-gradings/setting",
      icon: <Chart size="24" />,
    },
  ],

  requiredRoles: [RoleSlug.ORGANIZATION],
  requiredPermissions: [],

  prefetch: async () => {
    console.log("Prefetching Attendance module...");
  },

  onModuleLoad: () => {
    console.log("HRLink module loaded");
  },

  onModuleUnload: () => {
    console.log("HRLink module unloaded");
  },
};

export default JobGradingsPlugins;
