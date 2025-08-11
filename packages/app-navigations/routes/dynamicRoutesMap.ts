import type { RouteObject } from "react-router-dom";

import { projectManagementRoutes } from "./routeMaps";

const routeImporters: Record<string, () => Promise<{ routes: RouteObject[] }>> =
  {
    "/project-management": async () => ({ routes: projectManagementRoutes }),
  };

export const ProjectRoutesMap = routeImporters;
