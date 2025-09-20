import { lazyLoad } from 'core/routes';

import { ProcessMakerPath } from './paths';

const Dashboard = lazyLoad(() => import('../features/Dashboard'));
const ProcessMaker = lazyLoad(() => import('../features/ProcessMaker'));
const ProcessList = lazyLoad(() => import('../features/ProcessList'));

export const ProcessMakerContents: any = [
  {
    path: ProcessMakerPath.Dashboard,
    component: Dashboard,
  },
  {
    path: ProcessMakerPath.ProcessMaker,
    component: ProcessMaker,
  },
  {
    path: ProcessMakerPath.ProcessList,
    component: ProcessList,
  },
];
