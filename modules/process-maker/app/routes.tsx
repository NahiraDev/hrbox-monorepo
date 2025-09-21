import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

import { ProcessMakerPath } from './paths';

export const page = {
  dashboard: lazyLoad(() => import('../features/Dashboard')),
  process: lazyLoad(() => import('../features/ProcessMaker')),
  processList: lazyLoad(() => import('../features/ProcessList')),
};

export const ProcessMakerRoutes = createProjectRoutes('/process-maker', {
  [ProcessMakerPath.Dashboard]: page.dashboard,
  [ProcessMakerPath.ProcessMaker]: page.process,
  [ProcessMakerPath.ProcessList]: page.processList,
});
