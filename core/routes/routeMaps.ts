import type { RouteObject } from 'react-router-dom';

import { HRLinkRoutes } from '../../modules/hrlink/app/routes';

import { SSOHRLinkRoutes } from '../../modules/sso/router';
import { BasicInfoRoutes } from '../../modules/basic-info/router';

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> =
  {
    '/sso': async () => ({ routes: SSOHRLinkRoutes.routes }),
    '/basic-info': async () => ({ routes: BasicInfoRoutes.routes }),
    '/hrlink': async () => ({ routes: HRLinkRoutes.routes }),
  };

export const ProjectRoutesMap = routeImporters;
