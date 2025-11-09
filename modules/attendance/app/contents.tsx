import { AttendancePath } from '@module/attendance/app/paths';
import { lazyRouteComponent } from "@tanstack/react-router";

const Dashboard = lazyRouteComponent(() => import('@module/attendance/features/dashboard/Dashboard'));
const EntryExit = lazyRouteComponent(() => import('@module/attendance/features/registration/EntryExit'));
const AttendanceCalender = lazyRouteComponent(() => import('@module/attendance/features/attendanceCalender/AttendanceCalenders'));
const TrafficCalender = lazyRouteComponent(() => import('@module/attendance/features/attendanceCalender/TrafficCalender'));
const ExportPage = lazyRouteComponent(() => import('@module/attendance/features/Export/ExportPage'));
const ListOfApprovals = lazyRouteComponent(() => import('@module/attendance/features/ListApprovals/ListApprovals'));
const ShiftAllocation = lazyRouteComponent(() => import('@module/attendance/features/Allocation/ShiftAllocation'));
const FaceAllocation = lazyRouteComponent(() => import('@module/attendance/features/Allocation/FaceAllocation'));
const IpAllocation = lazyRouteComponent(() => import('@module/attendance/features/Allocation/IpAllocation'));
const LocationAllocation = lazyRouteComponent(() => import('@module/attendance/features/Allocation/LocationAllocation'));

export const AttendanceContents: any = [
  {
    path: AttendancePath.Dashboard,
    component: Dashboard,
  },
  {
    path: AttendancePath.EntryExitRegistration,
    component: EntryExit,
  },
  {
    path: AttendancePath.AttendanceCalenders,
    component: AttendanceCalender,
  },{
    path: AttendancePath.TrafficCalender,
    component: TrafficCalender,
  },
  {
    path: AttendancePath.Export,
    component: ExportPage,
  },
  {
    path: AttendancePath.ListOfApprovals,
    component: ListOfApprovals,
  },
  {
    path: AttendancePath.ShiftAllocation,
    component: ShiftAllocation,
  },{
    path: AttendancePath.FaceAllocation,
    component: FaceAllocation,
  },{
    path: AttendancePath.IpAllocation,
    component: IpAllocation,
  },{
    path: AttendancePath.LocationAllocation,
    component: LocationAllocation,
  },
];
