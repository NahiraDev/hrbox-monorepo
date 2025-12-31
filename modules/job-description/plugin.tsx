import { RoleSlug } from "@hrbox/core/config/theme";
import { Paths } from "@hrbox/modules/paths";
import type { ModulePlugin } from "@hrbox/modules/types";
import { lazyRouteComponent } from "@tanstack/react-router";
import {
  CalendarTick,
  Chart,
  Clock,
  DocumentSketch,
  Key,
  PasswordCheck,
  ReceiveSquare2,
  Setting3
} from "iconsax-reactjs";
import { lazy } from "react";

// ============================================
// Pages
// ============================================

const jobDescription = lazyRouteComponent(
  () => import("./pages/jobdescription/Jobdescription")
);
const DnnSuperVisor = lazyRouteComponent(
  () => import("./pages/dnnSuperVisor/DnnSuperVisor")
);

// ============================================
// SubHeaders (Lazy Load)
// ============================================

const JobHeader = lazy(() => import("./subHeaders/JobdescriptionHeader"));
const DnnSuperVisorHeader = lazy(
  () => import("./subHeaders/DnnSuperVisorSubHeader")
);

// ============================================
// Plugin Definition
// ============================================

export const JobDescriptionPlugin: ModulePlugin = {
  name: "job-description",
  version: "1.0.0",
  basePath: "/job-description",
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
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: JobHeader
    },
    {
      path: Paths.JobDescription.ObjectivesMission,
      component: DnnSuperVisor,
      layout: "base",
      meta: {
        title: "JobDescription",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: DnnSuperVisorHeader,
      subHeaderProps: {
        title: "DNN Supervisor",
        icon: <DocumentSketch size={18} color="white" />
      }
    }
  ],

  // ============================================
  // Menu
  // ============================================
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/attendance/dashboard",
      icon: <Chart size="24" />
    },
    {
      id: "entry-exit",
      label: "Entry Exit",
      path: "/attendance/entry-exit",
      icon: <PasswordCheck size="24" />
    },
    {
      id: "calender",
      label: "Attendance Calender",
      path: "/attendance/attendance-calender",
      icon: <CalendarTick size="24" />
    },
    {
      id: "traffic",
      label: "Traffic Calender",
      path: "/attendance/list-of-approvals",
      icon: <Key size="24" />
    },
    {
      id: "export",
      label: "Export",
      path: "/attendance/export",
      icon: <ReceiveSquare2 size="24" />
    },

    {
      id: "shift",
      label: "Shift Allocation",
      path: "/attendance/shift-allocation",
      icon: <Setting3 size="24" />
    },
    {
      id: "timesheet",
      label: "Time Sheet",
      path: "/attendance/all-projects",
      icon: <Clock size="24" />
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

export default JobDescriptionPlugin;
