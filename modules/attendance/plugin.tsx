// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import { lazy } from "react";
import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import { Profile, Briefcase, Building, PasswordCheck, Key, Chart, CalendarTick, ReceiveSquare, ReceiveSquare2, Setting3, Clock, Candle2, TaskSquare } from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";
import {
  FaceRecognitionAssignment,
  IpAllocationSubheader,
  LocationAllocationSubheader,
  ShiftAllocationSubheader,
} from "@hrbox/modules/attendance/subheaders/CreateAllocationSubHeaderWithHook";
import ProjectTimesheets from "./pages/TimeSheet/ProjectTimesheets";
import i18n from "../../core/translate";

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
const AllProjects = lazyRouteComponent(
  () => import("./pages/TimeSheet/AllProjects")
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
const TimeSheetSubHeader = lazy(
  () => import("./subheaders/TimeSheetSubHeader")
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
      layout: "framed",
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
      subHeaderProps:{
        title:"my_time",
        icon:<PasswordCheck size={18} color="white"/>
      }
    },
    {
      path: Paths.Attendance.AttendanceCalenders,
      component: AttendanceCalender,
      layout: "base",
      meta: {
        title: "attendance_calender",
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
        title: "approvals",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: ApprovalsSubHeader,
        subHeaderProps:{
        title:'list_of_approvals',
        icon:<Key size={18} color="white"/>
      }
    },
    {
      path: Paths.Attendance.ShiftAllocation,
      component: ShiftAllocation,
      layout: "base",
      meta: {
        title: "ُshift_allocation",
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
        title: "ُshift_allocation",
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
        title: "ip_allocation",
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
        title: "face_allocation",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: FaceRecognitionAssignment,
    },
    {
      path: Paths.Attendance.Export,
      component: ExportPage,
      layout: "framed",
      meta: {
        title: "export",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
    },
    {
      path: Paths.Attendance.TrafficCalender,
      component: TrafficCalender,
      layout: "base",
      meta: {
        title: "traffic_calendar",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: CalenderSubHeader,
    },
    {
      path: Paths.Attendance.AllProject,
      component: AllProjects,
      layout: "framed",
      meta: {
        title: "Project TimeSheets",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader:TimeSheetSubHeader ,
      subHeaderProps:{
        title:'All Projects',
        icon:<Candle2 color="white" size={18}/>
      }
    },
    {
      path: Paths.Attendance.ProjectTimeSheet,
      component: ProjectTimesheets,
      layout: "framed",
      meta: {
        title: "Project TimeSheets",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader:TimeSheetSubHeader ,
      subHeaderProps:{
        title:'Project TimeSheets',
        icon:<TaskSquare color="white" size={18}/>
      }
    },
  ],

  // ============================================
  // Menu
  // ============================================
  menu: [
    {
      id: "dashboard",
      label: i18n.t("dashboard"),
      path: "/attendance/dashboard",
      icon: <Chart size="24" />,
    },
    {
      id: "entry-exit",
      label: i18n.t("entry_exit"),
      path: "/attendance/entry-exit",
      icon: <PasswordCheck size="24" />,
    },
    {
      id: "calender",
      label: i18n.t("attendance_calendar"),
      path: "/attendance/attendance-calender",
      icon: <CalendarTick size="24" />,
    },{
      id: "traffic",
      label: i18n.t("traffic_calendar"),
      path: "/attendance/list-of-approvals",
      icon: <Key size="24" />,
    },
    {
      id: "export",
      label: i18n.t("export"),
      path: "/attendance/export",
      icon: <ReceiveSquare2 size="24" />,
    },
    
    {
      id: "shift",
      label: i18n.t("shift_allocation"),
      path: "/attendance/shift-allocation",
      icon: <Setting3 size="24" />,
    },
    {
      id: "timesheet",
      label: i18n.t("timesheet"),
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

export default AttendancePlugin;
