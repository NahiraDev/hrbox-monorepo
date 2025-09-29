import type { RouteObject } from 'react-router-dom';

import { HRLinkRoutes } from '@module/hrlink/app/routes';
import { SSOHRLinkRoutes } from '@module/sso/app/routes';
import { BasicInfoRoutes } from '@module/basic-info/app/routes';
import { ChartMakerRoutes } from '@module/chart-maker/app/routes';
import { ProcessMakerRoutes } from '@module/process-maker/app/routes';

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> = {
  '/sso': async () => ({ routes: SSOHRLinkRoutes.routes }),
  '/basic-info': async () => ({ routes: BasicInfoRoutes.routes }),
  '/hrlink': async () => ({ routes: HRLinkRoutes.routes }),
  '/chart-maker': async () => ({ routes: ChartMakerRoutes.routes }),
  '/process-maker': async () => ({ routes: ProcessMakerRoutes.routes }),
};

export const ProjectRoutesMap = routeImporters;
