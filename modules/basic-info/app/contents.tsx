import { lazyLoad } from 'core/routes';
import { BasicInfoPaths } from './paths';

const OrganizationDepartments = lazyLoad(() => import('../features/departments/OrganizationDepartments'));
const TechnicalDepartments = lazyLoad(() => import('../features/departments/TechnicalDepartments'));
const OrganizationalLocations = lazyLoad(() => import('../features/departments/OrganizationalLocations'));
const AllEmployees = lazyLoad(() => import('../features/employees/sub-header/EmployeesSubHeader'));

export const BasicInfoContents: any = [
  {
    path: BasicInfoPaths.OrganizationDepartments,
    component: OrganizationDepartments,
  },
  {
    path: BasicInfoPaths.TechnicalDepartment,
    component: TechnicalDepartments,
  },
  {
    path: BasicInfoPaths.OrganizationalLocations,
    component: OrganizationalLocations,
  },
  {
    path: BasicInfoPaths.AllEmployees,
    component: AllEmployees,
  },
];
