import { lazyLoad } from 'core/routes';
import { DocumentSketch,Location } from 'iconsax-react';

import { BasicInfoPaths } from './paths';

const OrganizationDepartments = lazyLoad(
  () => import('../features/departments/sub-header/OrganizationDepartmentsSubHeader'),
);
const TechnicalDepartments = lazyLoad(() => import('../features/departments/sub-header/TechnicalDepartmentsSubHeader'));
const OrganizationalLocations = lazyLoad(
  () => import('../features/departments/sub-header/OrganizationLocationSubHeader'),
);
const AllEmployees = lazyLoad(
  () => import('../features/employees/sub-header/EmployeesSubHeader'),
);

export const BasicInfoSubHeaders: any = [
  {
    path: BasicInfoPaths.OrganizationDepartments,
    component: OrganizationDepartments,
    props: {
      name: 'Organization Departments',
      icon: DocumentSketch,
    },
  },
  {
    path: BasicInfoPaths.TechnicalDepartment,
    component: TechnicalDepartments,
    props: {
      name: 'Technical Departments',
      icon: DocumentSketch,
    },
  },
  {
    path: BasicInfoPaths.OrganizationalLocations,
    component: OrganizationalLocations,
    props: {
      name: 'Organizational Locations',
      icon: Location,
    },
  },
  {
    path: BasicInfoPaths.AllEmployees,
    component: AllEmployees,
    props: {
      name: 'AllEmployees',
      icon: Location,
    },
  },
];
