import { lazyLoad } from 'core/routes';

import { AttendencePath } from './paths';

const Dashboard = lazyLoad(() => import('../features/dashboard/Dashboard'));
const EntryExit = lazyLoad(() => import('../features/registration/EntryExit'));
const AttendeceCAlender = lazyLoad(() => import('../features/attendenceCalender/AttendenceCalenders'));

export const AttendenceContents: any = [
  {
    path: AttendencePath.Dashboard,
    component: Dashboard,
  },
  {
    path: AttendencePath.EntryExitRegistration,
    component: EntryExit,
  },
  {
    path: AttendencePath.AttendeceCalenders,
    component: AttendeceCAlender,
  },
];
