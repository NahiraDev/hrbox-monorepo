import { DocumentSketch,Location } from 'iconsax-reactjs';

import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { lazyRouteComponent } from "@tanstack/react-router";

const OrganizationDepartments = lazyRouteComponent(
  () => import('@module/basic-info/features/departments/sub-header/OrganizationDepartmentsSubHeader'),
);
const TechnicalDepartments = lazyRouteComponent(() => import('@module/basic-info/features/departments/sub-header/TechnicalDepartmentsSubHeader'));
const OrganizationalLocations = lazyRouteComponent(
  () => import('@module/basic-info/features/departments/sub-header/OrganizationLocationSubHeader'),
);
const AllEmployees = lazyRouteComponent(
  () => import('@module/basic-info/features/employees/sub-header/EmployeesSubHeader'),
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
