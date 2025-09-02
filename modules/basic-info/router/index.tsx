import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

export const page = {
  departments: {
    organization: lazyLoad(() => import('../features/departments/organizationDepartments')),
    technical: lazyLoad(() => import('../features/departments/technicalDepartments')),
    location: lazyLoad(() => import('../features/departments/organizationDepartments')),
    employees: lazyLoad(() => import('../features/employees/EmployeeSatisfactionCalendar')),
  },
  employees: {
    all: lazyLoad(() => import('../features/employees/Employees')),
    satisfaction: lazyLoad(() => import('../features/employees/EmployeeSatisfactionCalendar')),
    personalInformation: lazyLoad(() => import('../features/common/PersonalInformation')),
  },
  common: {
    Documents: lazyLoad(() => import('../features/common/Documents')),
    Jobs: lazyLoad(() => import('../features/common/Jobs')),
  },
};

export const BasicInfoRoutes = createProjectRoutes('/basic-info', {
  organizationDepartments: page.departments.organization,
  technicalDepartments: page.departments.technical,
  OrganizationalLocations: page.departments.location,
  EmployeeSatisfactionCalendar: page.employees.satisfaction,
  PersonalInformation: page.employees.personalInformation,
  Documents: page.common.Documents,
  Jobs: page.common.Jobs,
});
