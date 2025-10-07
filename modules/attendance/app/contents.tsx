import { lazyLoad } from '@core/routes';

import { AttendancePath } from '@module/attendance/app/paths';

const Dashboard = lazyLoad(() => import('@module/attendance/features/dashboard/Dashboard'));
const EntryExit = lazyLoad(() => import('@module/attendance/features/registration/EntryExit'));
const AttendanceCalender = lazyLoad(() => import('@module/attendance/features/attendanceCalender/AttendanceCalenders'));

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
  },
];
