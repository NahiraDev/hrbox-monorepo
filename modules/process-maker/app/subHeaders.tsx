import { lazyLoad } from '@core/routes';
import { Personalcard } from 'iconsax-react';

import { ProcessMakerPath } from '@module/process-maker/app/paths';

const ProcessListSubHeader = lazyLoad(() => import('@module/process-maker/features/ProcessListSubHeader'));
const DashboardSubHeader = lazyLoad(() => import('@module/process-maker/features/DashboardSubHeader'));

export const ProcessMakerSubHeaders: any = [
  {
    path: ProcessMakerPath.Dashboard,
    component: DashboardSubHeader,
  },
  {
    path: ProcessMakerPath.ProcessMaker,
    component: null,
  },
  {
    path: ProcessMakerPath.ProcessList,
    component: ProcessListSubHeader,
    props: {
      icon: Personalcard,
      name: 'user Information',
    },
  },
];
