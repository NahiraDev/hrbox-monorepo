import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

export const page = {
  dashboard: lazyLoad(() => import('../features/Dashboard')),
  process: lazyLoad(() => import('../features/Process')),
  processList: lazyLoad(() => import('../features/ProcessList')),
};

export const ProcessMakerRoutes = createProjectRoutes('/process-maker', {
  dashboard: page.dashboard,
  process: page.process,
  processList: page.processList,
});
