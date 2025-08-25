import type { RouteObject } from 'react-router-dom';

import { SSOHRLinkRoutes } from '../../modules/sso/router';
import { BasicInfoRoutes } from '../../modules/basic-info/router';

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> =
  {
    '/sso': async () => ({ routes: SSOHRLinkRoutes }),
    '/basic-info': async () => ({ routes: BasicInfoRoutes }),
  };

export const ProjectRoutesMap = routeImporters;
