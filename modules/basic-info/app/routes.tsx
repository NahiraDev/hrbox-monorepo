import { lazyLoad } from 'core/index';
import { createProjectRoutes } from 'core/index';

export const page = {
  departments: {
    organization: lazyLoad(() => import('../features/departments/OrganizationDepartments')),
    technical: lazyLoad(() => import('../features/departments/TechnicalDepartments')),
    location: lazyLoad(() => import('../features/departments/OrganizationDepartments')),
    employees: lazyLoad(() => import('../features/employees/EmployeeSatisfactionCalendar')),
  },
  employees: {
    all: lazyLoad(() => import('../features/employees/Employees')),
    satisfaction: lazyLoad(() => import('../features/employees/EmployeeSatisfactionCalendar')),
    personalInformation: lazyLoad(() => import('../features/employees/PersonalInformation')),
    Documents: lazyLoad(() => import('../features/employees/Documents')),
    Jobs: lazyLoad(() => import('../features/employees/Jobs')),
  },
};

export const BasicInfoRoutes = createProjectRoutes('/basic-info', {
  OrganizationDepartments: page.departments.organization,
  TechnicalDepartments: page.departments.technical,
  OrganizationalLocations: page.departments.location,
  EmployeeSatisfactionCalendar: page.employees.satisfaction,
  PersonalInformation: page.employees.personalInformation,
  Documents: page.employees.Documents,
  Jobs: page.employees.Jobs,
});
