import { Dashboard } from "@module/project-management";

import { createProjectRoutes } from "../createProjectRoutes";
const basePath = "/project-management";

export const projectManagementRoutes = createProjectRoutes(basePath, {
  Dashboard,
});
