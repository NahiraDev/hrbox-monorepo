import type { RouteObject } from 'react-router-dom';

import { HRLinkRoutes } from '../modules/hrlink/app/routes';
import { SSOHRLinkRoutes } from '../modules/sso/app/routes';
import { BasicInfoRoutes } from '../modules/basic-info/app/routes';
import { ChartMakerRoutes } from '../modules/chart-maker/app/routes';

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> =
  {
    '/sso': async () => ({ routes: SSOHRLinkRoutes.routes }),
    '/basic-info': async () => ({ routes: BasicInfoRoutes.routes }),
    '/hrlink': async () => ({ routes: HRLinkRoutes.routes }),
    '/chart-maker': async () => ({ routes: ChartMakerRoutes.routes }),
  };

export const ProjectRoutesMap = routeImporters;
