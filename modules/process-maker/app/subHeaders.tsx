import { Personalcard } from 'iconsax-reactjs';

import { ProcessMakerPath } from '@module/process-maker/app/paths';
import { lazy } from "react";



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
