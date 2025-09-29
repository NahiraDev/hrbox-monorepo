import { lazyLoad , createProjectRoutes } from '@core/routes';

import { ProcessMakerPath } from '@module/process-maker/app/paths';

export const page = {
  dashboard: lazyLoad(() => import('@module/process-maker/features/Dashboard')),
  process: lazyLoad(() => import('@module/process-maker/features/ProcessMaker')),
  processList: lazyLoad(() => import('@module/process-maker/features/ProcessList')),
};

export const ProcessMakerRoutes = createProjectRoutes('/process-maker', {
  [ProcessMakerPath.Dashboard]: page.dashboard,
  [ProcessMakerPath.ProcessMaker]: page.process,
  [ProcessMakerPath.ProcessList]: page.processList,
});
