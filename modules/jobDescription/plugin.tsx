// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from "react";
import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import { Profile, Briefcase, Building, PasswordCheck, Key, Chart, CalendarTick, ReceiveSquare, ReceiveSquare2, Setting3, Clock, Candle2, TaskSquare } from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";
import jobdescriptionHeader from "./subHeaders/jobdescriptionHeader";

// ============================================
// Pages
// ============================================

const jobDescription= lazyRouteComponent(
  () => import("./pages/jobdescription/jobdescription")
);

// ============================================
// SubHeaders (Lazy Load)
// ============================================

const DashboardSubHeader = lazy(
  () => import("./subHeaders/jobdescriptionHeader")
);


// ============================================
// Plugin Definition
// ============================================

export const JobDescriptionPlugin: ModulePlugin = {
  name: "jobdescription",
  version: "1.0.0",
  basePath: "/jobdescription",
  layout: "base",
  description: "",
  author: "HRBox Team",

  // ============================================
  // Routes
  // ============================================
  routes: [
    {
      path: Paths.JobDescription.jobdescription,
      component: jobDescription,
      layout: "framed",
      meta: {
        title: "JobDescription",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: jobdescriptionHeader,
    },

  ],

  // ============================================
  // Menu
  // ============================================
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/attendance/dashboard",
      icon: <Chart size="24" />,
    },
    {
      id: "entry-exit",
      label: "Entry Exit",
      path: "/attendance/entry-exit",
      icon: <PasswordCheck size="24" />,
    },
    {
      id: "calender",
      label: "Attendance Calender",
      path: "/attendance/attendance-calender",
      icon: <CalendarTick size="24" />,
    },{
      id: "traffic",
      label: "Traffic Calender",
      path: "/attendance/list-of-approvals",
      icon: <Key size="24" />,
    },
    {
      id: "export",
      label: "Export",
      path: "/attendance/export",
      icon: <ReceiveSquare2 size="24" />,
    },
    
    {
      id: "shift",
      label: "Shift Allocation",
      path: "/attendance/shift-allocation",
      icon: <Setting3 size="24" />,
    },
    {
      id: "timesheet",
      label: "Time Sheet",
      path: "/attendance/all-projects",
      icon: <Clock size="24" />,
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

export default JobDescriptionPlugin;
