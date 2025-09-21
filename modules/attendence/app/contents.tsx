import { lazyLoad } from 'core/routes';

import { AttendencePath } from './paths';

const Dashboard = lazyLoad(() => import('../features/dashboard/Dashboard'));

export const AttendenceContents: any = [
  {
    path: AttendencePath.Dashboard,
    component: Dashboard,
  },
];
