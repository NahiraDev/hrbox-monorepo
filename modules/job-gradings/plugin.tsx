// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from "react";
import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import {
  Briefcase,
  BrifecaseTick,
  Chart,
  Convertshape,
  DocumentSketch,
  ReceiveSquare,
  ReceiveSquare2,
  Setting2
} from "iconsax-reactjs";
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
);
const general = lazyRouteComponent(
  () => import("./pages/setting/General")
);
const JDPage = lazyRouteComponent(
  () => import("./pages/jdpage/JDPage")
);
const JobEmployee = lazyRouteComponent(
  () => import("./pages/Job-Employee/JobEmployee")
);
const EmployeeProfile = lazyRouteComponent(
  () => import("./pages/Job-Employee/EmployeeProfile")
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
);
const EmployeeHeader = lazy(
  () => import("./subheaders/EmployeeHeader")
);
const EmployeeProfileHeader = lazy(
  () => import("./subheaders/EmployeeProfileHeader")
);

// ============================================
// Plugin Definition
// ============================================

export const JobGradingsPlugins: ModulePlugin = {
  name: "job-gradings",
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
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: DashboardSubHeader,
      subHeaderProps: {
        title: "Dashboard",
        icon: <Chart color="#FFFFFF" />
      }
    },
    {
      path: Paths.JobGradings.Indicators,
      component: indicator,
      layout: "base",
      meta: {
        title: "Setting",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: SettingSubHeader,
      subHeaderProps: {
        title: "Indicators",
        icon: <Setting2 color="#FFFFFF" />
      }
    }, {
      path: Paths.JobGradings.General,
      component: general,
      layout: "base",
      meta: {
        title: "Setting",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: SettingSubHeader,
      subHeaderProps: {
        title: "Indicators",
        icon: <Setting2 color="#FFFFFF" />
      }
    },
    {
      path: Paths.JobGradings.JDPage,
      component: JDPage,
      layout: "base",
      meta: {
        title: "JDPage",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: JDHeader,
      subHeaderProps: {
        title: "JD List",
        icon: <Briefcase color="#FFFFFF"   />
      }
    },
    {
      path: Paths.JobGradings.Employee,
      component: JobEmployee,
      layout: "framed",
      meta: {
        title: "Employee-job fit",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: EmployeeHeader,
      subHeaderProps: {
        title: "Employee-job fit",

        icon: <DocumentSketch color="#FFFFFF" />,
      },
    },
    {
      path: Paths.JobGradings.EmployeeProfile,
      component: EmployeeProfile,
      layout: "framed",
      meta: {
        title: "Employees-on-This-Job",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: EmployeeProfileHeader,
      subHeaderProps: {
        title: "Employees-on-This-Job",
        icon: <Convertshape color="#FFFFFF" />,
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
      icon: <Chart cursor="pointer"  size="24" />
    },
    {
      id: "setting",
      label: "indicators",
      path: "/job-gradings/setting/indicators",
      icon: <BrifecaseTick cursor="pointer"  size="24" />
    },
    {
      id: "JDPage",
      label: "JDPage",
      path: "/job-gradings/jdpage",
      icon: <Convertshape cursor="pointer"  size="24" />
    }, {
      id: "Job-Employee",
      label: "Employee-job fit",
      path: "/job-gradings/job-employee",
      icon: <ReceiveSquare2 cursor="pointer" size="24" />
    }
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
  }
};

export default JobGradingsPlugins;
