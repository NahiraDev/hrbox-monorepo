import { lazyLoad } from 'core/routes';
import EntryExitSubHeader from '@module/attendence/features/registration/EntryExitSubHeader';

import { AttendencePath } from './paths';

const DashboardSubHeader = lazyLoad(() => import('../features/dashboard/DashboardSubHeader'));

export const AttendenceSubHeaders: any = [
  {
    path: AttendencePath.Dashboard,
    component: DashboardSubHeader,
  },
  {
    path: AttendencePath.EntryExitRegistration,
    component: EntryExitSubHeader,
  },
];
