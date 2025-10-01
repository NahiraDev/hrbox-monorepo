import { lazyLoad } from '@core/routes';
import { createProjectRoutes } from '@core/routes';

import { AttendancePath } from '@module/attendance/app/paths';

export const page = {
  dashboard: lazyLoad(() => import('@module/attendance/features/dashboard/Dashboard')),
  entryexits: lazyLoad(() => import('@module/attendance/features/registration/EntryExit')),
  attendancecalender: lazyLoad(() => import('@module/attendance/features/attendanceCalender/AttendanceCalenders')),
  exportPage: lazyLoad(() => import('@module/attendance/features/Export/ExportPage')),
  ListOfApprovals: lazyLoad(() => import('@module/attendance/features/ListApprovals/ListApprovals')),
};
export const AttendanceRoutes = createProjectRoutes('/attendance', {
  [AttendancePath.Dashboard]: page.dashboard,
  [AttendancePath.EntryExitRegistration]: page.entryexits,
  [AttendancePath.AttendanceCalenders]: page.attendancecalender,
  [AttendancePath.Export]: page.exportPage,
  [AttendancePath.ListOfApprovals]: page.ListOfApprovals,
});
