import type { RouteObject } from 'react-router-dom';

import { HRLinkRoutes } from '../modules/hrlink/app/routes';
import { SSOHRLinkRoutes } from '../modules/sso/app/routes';
import { BasicInfoRoutes } from '../modules/basic-info/app/routes';
import { ChartMakerRoutes } from '../modules/chart-maker/app/routes';
import { ProcessMakerRoutes } from '../modules/process-maker/app/routes';
import { AttendenceRoutes } from '@module/attendence/app/routes';

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> = {
  '/sso': async () => ({ routes: SSOHRLinkRoutes.routes }),
  '/basic-info': async () => ({ routes: BasicInfoRoutes.routes }),
  '/hrlink': async () => ({ routes: HRLinkRoutes.routes }),
  '/chart-maker': async () => ({ routes: ChartMakerRoutes.routes }),
  '/process-maker': async () => ({ routes: ProcessMakerRoutes.routes }),
  '/attendence': async () => ({ routes: AttendenceRoutes.routes }),
};

export const ProjectRoutesMap = routeImporters;
