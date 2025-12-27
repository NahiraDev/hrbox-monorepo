// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from "react";
import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import {Briefcase, Chart, Convertshape, Document, DocumentSketch, Setting2} from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";


// ============================================
// Pages
// ============================================

const Dashboard = lazyRouteComponent(
  () => import("./pages/dashboard/Dashboard")
);
const indicator = lazyRouteComponent(
  () => import("./pages/setting/Indicator")
);const general = lazyRouteComponent(
  () => import("./pages/setting/General")
);
const JDPage = lazyRouteComponent(
  () => import("./pages/jdpage/JDPage")
);
const JobEmployee = lazyRouteComponent(
  () => import("./pages/Job-Employee/JobEmployee")
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
const JDHeader = lazy(
  () => import("./subheaders/JDHeader")
);const EmployeeHeader = lazy(
  () => import("./subheaders/EmployeeHeader")
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
      path: Paths.JobGradings.Indicators,
      component:indicator ,
      layout: "base",
      meta: {
        title: "Indicator",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: SettingSubHeader,
      subHeaderProps:{
        title:"Indicators",
        icon:<Setting2/>
      }
    }, {
      path: Paths.JobGradings.General,
      component:general ,
      layout: "base",
      meta: {
        title: "Indicator",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: SettingSubHeader,
      subHeaderProps:{
        title:"Indicators",
        icon:<Setting2/>
      }
    },
    {
      path: Paths.JobGradings.JDPage,
      component: JDPage,
      layout: "base",
      meta: {
        title: "JDPage",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: JDHeader,
      subHeaderProps: {
        title: "JD List",
        icon: <Briefcase />,
      },
    },
    {
      path: Paths.JobGradings.Employee,
      component: JobEmployee,
      layout: "framed",
      meta: {
        title: "Employee-job fit",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: EmployeeHeader,
      subHeaderProps: {
        title: "Employee-job fit",
        icon: <DocumentSketch color="#FFFFFF" />,
      },
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
      label: "indicators",
      path: "/job-gradings/setting",
      icon: <Chart size="24" />,
    },
    {
      id: "JDPage",
      label: "JDPage",
      path: "/job-gradings/jdpage",
      icon: <Chart size="24" />,
    },{
      id: "Job-Employee",
      label: "Employee-job fit",
      path: "/job-gradings/job-employee",
      icon: <Convertshape size="24" />,
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
