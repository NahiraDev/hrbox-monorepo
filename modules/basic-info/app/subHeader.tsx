import { DocumentSketch,Location } from 'iconsax-reactjs';

import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { lazyRouteComponent } from "@tanstack/react-router";


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
