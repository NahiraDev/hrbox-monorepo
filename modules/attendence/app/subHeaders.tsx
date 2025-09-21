import { lazyLoad } from 'core/routes';

import { AttendencePath } from './paths';

const DashboardSubHeader = lazyLoad(() => import('../features/dashboard/DashboardSubHeader'));

export const AttendenceSubHeaders: any = [
  {
    path: AttendencePath.Dashboard,
    component: DashboardSubHeader,
  },
];
