import { lazyLoad } from '@core/routes';
import { createProjectRoutes } from '@core/routes';

import { AttendancePath } from '@module/attendance/app/paths';

export const page = {
  dashboard: lazyLoad(() => import('@module/attendance/features/dashboard/Dashboard')),
  entryexits: lazyLoad(() => import('@module/attendance/features/registration/EntryExit')),
  attendancecalender: lazyLoad(() => import('@module/attendance/features/attendanceCalender/AttendanceCalenders')),
  trafficCalender: lazyLoad(() => import('@module/attendance/features/attendanceCalender/TrafficCalender')),
  exportPage: lazyLoad(() => import('@module/attendance/features/Export/ExportPage')),
  ListOfApprovals: lazyLoad(() => import('@module/attendance/features/ListApprovals/ListApprovals')),
  ShitAllocation: lazyLoad(() => import('@module/attendance/features/Allocation/ShiftAllocation')),
  FaceAllocation: lazyLoad(() => import('@module/attendance/features/Allocation/FaceAllocation')),
  IpAllocation: lazyLoad(() => import('@module/attendance/features/Allocation/IpAllocation')),
  FaceAllocation: lazyLoad(() => import('@module/attendance/features/Allocation/FaceAllocation')),
  LocationAllocation: lazyLoad(() => import('@module/attendance/features/Allocation/LocationAllocation')),
};
export const AttendanceRoutes = createProjectRoutes('/attendance', {
  [AttendancePath.Dashboard]: page.dashboard,
  [AttendancePath.EntryExitRegistration]: page.entryexits,
  [AttendancePath.AttendanceCalenders]: page.attendancecalender,
  [AttendancePath.TrafficCalender]: page.trafficCalender,
  [AttendancePath.Export]: page.exportPage,
  [AttendancePath.ListOfApprovals]: page.ListOfApprovals,
  [AttendancePath.ShiftAllocation]:page.ShitAllocation,
  [AttendancePath.FaceAllocation]:page.FaceAllocation,
  [AttendancePath.IpAllocation]:page.IpAllocation,
  [AttendancePath.LocationAllocation]:page.LocationAllocation,
});
