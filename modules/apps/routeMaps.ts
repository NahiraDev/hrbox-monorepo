import type { RouteObject } from 'react-router-dom';

import { HRLinkRoutes } from '../hrlink/app/routes.tsx';
import { SSOHRLinkRoutes } from '../sso/app/routes.tsx';
import { BasicInfoRoutes } from '../basic-info/app/routes.tsx';
import { ChartMakerRoutes } from '../chart-maker/app/routes.tsx';
import { ProcessMakerRoutes } from '../process-maker/app/routes.tsx';

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> = {
  '/sso': async () => ({ routes: SSOHRLinkRoutes.routes }),
  '/basic-info': async () => ({ routes: BasicInfoRoutes.routes }),
  '/hrlink': async () => ({ routes: HRLinkRoutes.routes }),
  '/chart-maker': async () => ({ routes: ChartMakerRoutes.routes }),
  '/process-maker': async () => ({ routes: ProcessMakerRoutes.routes }),
};

export const ProjectRoutesMap = routeImporters;
