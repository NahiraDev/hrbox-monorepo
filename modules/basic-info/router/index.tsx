import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

export const page = {
  departments: {
    organization: lazyLoad(
      () => import('../features/departments/organizationDepartments'),
    ),
    technical: lazyLoad(
      () => import('../features/departments/technicalDepartments.tsx'),
    ),
    location: lazyLoad(
      () => import('../features/departments/organizationDepartments'),
    ),
    employees: lazyLoad(
      () => import('../features/employees/EmployeeSatisfactionCalendar')
    )
  },
  employees: {
    all: lazyLoad(() => import('../features/employees/Employees')),
    satisfaction: lazyLoad(
      () => import('../features/employees/EmployeeSatisfactionCalendar'),
    ),
    personalInformation: lazyLoad(
      () => import('../features/employees/PersonalInformation'),
    )
  },

};

export const BasicInfoRoutes = createProjectRoutes('/basic-info', {
  organizationDepartments: page.departments.organization,
  technicalDepartments: page.departments.technical,
  OrganizationalLocations: page.departments.location,
  EmployeeSatisfactionCalendar: page.employees.satisfaction,
  PersonalInformation:page.employees.personalInformation,
});
