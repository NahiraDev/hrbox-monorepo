import { lazyLoad } from 'core/index';
import { createProjectRoutes } from 'core/index';

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
    personalInformation: lazyLoad(() => import('../features/employees/PersonalInformation')),
    Documents: lazyLoad(() => import('../features/employees/Documents')),
    Jobs: lazyLoad(() => import('../features/employees/Jobs')),
  },
};

export const BasicInfoRoutes = createProjectRoutes('/basic-info', {
  organizationDepartments: page.departments.organization,
  technicalDepartments: page.departments.technical,
  OrganizationalLocations: page.departments.location,
  EmployeeSatisfactionCalendar: page.employees.satisfaction,
  PersonalInformation: page.employees.personalInformation,
  Documents: page.employees.Documents,
  Jobs: page.employees.Jobs,
});
