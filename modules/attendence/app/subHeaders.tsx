import { lazyLoad } from 'core/routes';

import { AttendencePath } from './paths';

const DashboardSubHeader = lazyLoad(() => import('../features/dashboard/DashboardSubHeader'));
const EntryExitSubHeader = lazyLoad(() => import('../features/registration/EntryExitSubHeader'));
const CalenderSubHeader = lazyLoad(() => import('../features/attendenceCalender/CalenderSubHeader'));

export const AttendenceSubHeaders: any = [
  {
    path: AttendencePath.Dashboard,
    component: DashboardSubHeader,
  },
  {
    path: AttendencePath.EntryExitRegistration,
    component: EntryExitSubHeader,
  },
  {
    path: AttendencePath.AttendeceCalenders,
    component: CalenderSubHeader,
  },
];
