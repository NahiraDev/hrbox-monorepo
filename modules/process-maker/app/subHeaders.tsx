import { lazyLoad } from 'core/routes';
import { Personalcard } from 'iconsax-react';

import { ProcessMakerPath } from './paths';

const ProcessListSubHeader = lazyLoad(() => import('../features/ProcessListSubHeader'));

export const ProcessMakerSubHeaders: any = [
  {
    path: ProcessMakerPath.Dashboard,
    component: null,
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
