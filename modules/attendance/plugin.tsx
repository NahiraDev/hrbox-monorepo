// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from "react";
import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import { Profile, Briefcase, Building, PasswordCheck } from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";
import {
  FaceRecognitionAssignment,
  IpAllocationSubheader,
  LocationAllocationSubheader,
  ShiftAllocationSubheader,
} from "@hrbox/modules/attendance/subheaders/CreateAllocationSubHeaderWithHook";

// ============================================
// Pages
// ============================================

const Dashboard = lazyRouteComponent(
  () => import("./pages/dashboard/Dashboard")
);
const EntryExit = lazyRouteComponent(
  () => import("./pages/registration/EntryExit")
);
const AttendanceCalender = lazyRouteComponent(
  () => import("./pages/attendanceCalender/AttendanceCalenders")
);
const TrafficCalender = lazyRouteComponent(
  () => import("./pages/attendanceCalender/TrafficCalender")
);
const ExportPage = lazyRouteComponent(
  () => import("./pages/Export/ExportPage")
);
const ListOfApprovals = lazyRouteComponent(
  () => import("./pages/ListApprovals/ListApprovals")
);
const ShiftAllocation = lazyRouteComponent(
  () => import("./pages/Allocation/ShiftAllocation")
);
const FaceAllocation = lazyRouteComponent(
  () => import("./pages/Allocation/FaceAllocation")
);
const IpAllocation = lazyRouteComponent(
  () => import("./pages/Allocation/IpAllocation")
);
const LocationAllocation = lazyRouteComponent(
  () => import("./pages/Allocation/LocationAllocation")
);

// ============================================
// SubHeaders (Lazy Load)
// ============================================

const DashboardSubHeader = lazy(
  () => import("./subheaders/DashboardSubHeader")
);
const EntryExitSubHeader = lazy(
  () => import("./subheaders/EntryExitSubHeader")
);
const CalenderSubHeader = lazy(() => import("./subheaders/CalenderSubHeader"));
const ApprovalsSubHeader = lazy(
  () => import("./subheaders/ApprovalsSubHeader")
);

// ============================================
// Plugin Definition
// ============================================

export const AttendancePlugin: ModulePlugin = {
  name: "attendance",
  version: "1.0.0",
  basePath: "/attendance",
  layout: "base",
  description: "",
  author: "HRBox Team",

  // ============================================
  // Routes
  // ============================================
  routes: [
    {
      path: Paths.Attendance.Dashboard,
      component: Dashboard,
      layout: "base",
      meta: {
        title: "Dashboard",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: DashboardSubHeader,
    },

    {
      path: Paths.Attendance.EntryExitRegistration,
      component: EntryExit,
      layout: "base",
      meta: {
        title: "Entry Exit",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: EntryExitSubHeader,
    },
    {
      path: Paths.Attendance.AttendanceCalenders,
      component: AttendanceCalender,
      layout: "base",
      meta: {
        title: "Attendance Calendar",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: CalenderSubHeader,
    },
    {
      path: Paths.Attendance.ListOfApprovals,
      component: ListOfApprovals,
      layout: "base",
      meta: {
        title: "Approvals",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: ApprovalsSubHeader,
    },
    {
      path: Paths.Attendance.ShiftAllocation,
      component: ShiftAllocation,
      layout: "base",
      meta: {
        title: "ُShift Allocation",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: ShiftAllocationSubheader,
    },
    {
      path: Paths.Attendance.LocationAllocation,
      component: LocationAllocation,
      layout: "base",
      meta: {
        title: "Location Allocation",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: LocationAllocationSubheader,
    },
    {
      path: Paths.Attendance.IpAllocation,
      component: IpAllocation,
      layout: "base",
      meta: {
        title: "Ip Allocation",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: IpAllocationSubheader,
    },
    {
      path: Paths.Attendance.FaceAllocation,
      component: FaceAllocation,
      layout: "base",
      meta: {
        title: "Face Allocation",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: FaceRecognitionAssignment,
    },
    {
      path: Paths.Attendance.Export,
      component: ExportPage,
      layout: "base",
      meta: {
        title: "Export",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
    },
    {
      path: Paths.Attendance.TrafficCalender,
      component: TrafficCalender,
      layout: "base",
      meta: {
        title: "Traffic Calendar",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
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
      path: "/attendance/dashboard",
      icon: <Profile size="24" />,
    },
    {
      id: "entry-exit",
      label: "Entry Exit",
      path: "/attendance/entry-exit",
      icon: <Profile size="24" />,
    },
    {
      id: "calender",
      label: "Attendance Calender",
      path: "/attendance/attendance-calender",
      icon: <Briefcase size="24" />,
    },
    {
      id: "export",
      label: "Export",
      path: "/attendance/export",
      icon: <Building size="24" />,
    },
    {
      id: "traffic",
      label: "Traffic Calender",
      path: "/attendance/traffic-calender",
      icon: <Building size="24" />,
    },
    {
      id: "shift",
      label: "Shift Allocation",
      path: "/attendance/shift-allocation",
      icon: <Building size="24" />,
    },
    {
      id: "approvals",
      label: "List Of Approvals",
      path: "/attendance/list-of-approvals",
      icon: <Building size="24" />,
    },
    {
      id: "export",
      label: "Export",
      path: "/attendance/export",
      icon: <Building size="24" />,
    },
    {
      id: "face",
      label: "Face Allocation",
      path: "/attendance/face-allocation",
      icon: <Building size="24" />,
    },
    {
      id: "shift",
      label: "Shift Allocation",
      path: "/attendance/shift-allocation",
      icon: <Building size="24" />,
    },
    {
      id: "ip",
      label: "Ip Allocation",
      path: "/attendance/ip-allocation",
      icon: <Building size="24" />,
    },
    {
      id: "location",
      label: "Location Allocation",
      path: "/attendance/location-allocation",
      icon: <Building size="24" />,
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

export default AttendancePlugin;
