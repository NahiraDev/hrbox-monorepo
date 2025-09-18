import { lazyLoad } from 'core/routes';
import { BasicInfoPaths } from './paths';

const OrganizationDepartments = lazyLoad(() => import('../features/departments/OrganizationDepartments'));
const TechnicalDepartments = lazyLoad(() => import('../features/departments/TechnicalDepartments'));
const OrganizationalLocations = lazyLoad(() => import('../features/departments/OrganizationalLocations'));
const AllEmployees = lazyLoad(() => import('../features/employees/sub-header/EmployeesSubHeader'));
const TestReport = lazyLoad(() => import('../features/employees/More/TestReport'));
const HealthRecords = lazyLoad(() => import('../features/employees/More/HealthRecord'));
const Documents = lazyLoad(() => import('../features/employees/Documents'));

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
  {
    path: BasicInfoPaths.TestReport,
    component: TestReport,
  },
  {
    path: BasicInfoPaths.HealthRecords,
    component: HealthRecords,
  },
  {
    path: BasicInfoPaths.Documents,
    component: Documents,
  },
];
