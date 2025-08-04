import { createProjectRoutes } from '../createProjectRoutes';
import { Dashboard } from '@hrbox-apps/project-management';

const basePath = '/project-management';

export const projectManagementRoutes = createProjectRoutes(basePath, {
  Dashboard,
});
