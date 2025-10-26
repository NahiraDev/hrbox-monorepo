import { lazyLoad } from '@core/routes';
import { DocumentSketch, LikeShapes, Location } from 'iconsax-react';

import { BasicInfoPaths } from '@module/basic-info/app/paths';

const OrganizationDepartments = lazyLoad(
  () => import('@module/basic-info/features/departments/sub-header/OrganizationDepartmentsSubHeader'),
);
const TechnicalDepartments = lazyLoad(() => import('@module/basic-info/features/departments/sub-header/TechnicalDepartmentsSubHeader'));
const OrganizationalLocations = lazyLoad(
  () => import('@module/basic-info/features/departments/sub-header/OrganizationLocationSubHeader'),
);
const AllEmployees = lazyLoad(
  () => import('@module/basic-info/features/employees/sub-header/EmployeesSubHeader'),
);
const EmployeeSatisfactionCalendarSubHeader = lazyLoad(
  () => import('@module/basic-info/features/employees/sub-header/EmployeeSatisfactionCalendarSubHeader'),
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
  {
    path: BasicInfoPaths.EmployeeSatisfactionCalendar,
    component: EmployeeSatisfactionCalendarSubHeader,
    props: {
      name: 'Satisfaction Status',
      icon: LikeShapes,
    },
  },
];
