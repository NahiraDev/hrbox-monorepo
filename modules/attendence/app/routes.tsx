import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

import { AttendencePath } from './paths';

export const page = {
  dashboard: lazyLoad(() => import('../features/dashboard/Dashboard')),
  entryexits: lazyLoad(() => import('../features/registration/EntryExit')),
  attendececalender: lazyLoad(() => import('../features/attendenceCalender/AttendenceCalenders')),
};
export const AttendenceRoutes = createProjectRoutes('/attendence', {
  [AttendencePath.Dashboard]: page.dashboard,
  [AttendencePath.EntryExitRegistration]: page.entryexits,
  [AttendencePath.AttendeceCalenders]: page.attendececalender,
});
