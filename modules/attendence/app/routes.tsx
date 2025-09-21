import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

import { AttendencePath } from './paths';

export const page = {
  dashboard: lazyLoad(() => import('../features/dashboard/Dashboard')),
};
export const AttendenceRoutes = createProjectRoutes('/attendence', {
  [AttendencePath.Dashboard]: page.dashboard,
});
