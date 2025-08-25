import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

export const organizationDepartments = lazyLoad(
  () => import('../features/departments/organizationDepartments'),
);
export const technicalDepartments = lazyLoad(
  () => import('../features/departments/technicalDepartments'),
);
export const OrganizationalLocations = lazyLoad(
  () => import('../features/location/OrganizationalLocations.tsx'),
);
export const Employees = lazyLoad(
  () => import('../features/employees/Employees.tsx'),
);
export const SatisfactionStatus = lazyLoad(
  () => import('../features/employees/SatisfactionStatus.tsx'),
);

export const BasicInfoRoutes = createProjectRoutes('/basic-info', {
  organizationDepartments,
  technicalDepartments,
  OrganizationalLocations ,
  Employees,
  SatisfactionStatus,
});
