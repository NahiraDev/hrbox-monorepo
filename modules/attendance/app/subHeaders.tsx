import { lazyLoad } from '@core/routes';

import { AttendancePath } from '@module/attendance/app/paths';

const DashboardSubHeader = lazyLoad(() => import('../features/dashboard/DashboardSubHeader'));
const EntryExitSubHeader = lazyLoad(() => import('../features/registration/EntryExitSubHeader'));
const CalenderSubHeader = lazyLoad(() => import('../features/attendanceCalender/CalenderSubHeader'));

export const AttendanceSubHeaders: any = [
  {
    path: AttendancePath.Dashboard,
    component: DashboardSubHeader,
  },
  {
    path: AttendancePath.EntryExitRegistration,
    component: EntryExitSubHeader,
  },
  {
    path: AttendancePath.AttendanceCalenders,
    component: CalenderSubHeader,
  },
];
