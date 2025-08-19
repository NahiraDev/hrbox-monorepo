import type { RouteObject } from 'react-router-dom';

import { SSOHRLinkRoutes } from '@module/sso/router';

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> =
  {
    '/sso': async () => ({ routes: SSOHRLinkRoutes }),
  };

export const ProjectRoutesMap = routeImporters;
