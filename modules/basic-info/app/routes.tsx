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
    Education: lazyLoad(() => import('../features/employees/Education')),
    skills: lazyLoad(() => import('../features/employees/Skills')),
    courses: lazyLoad(() => import('../features/employees/Courses')),
    Achievements: lazyLoad(() => import('../features/employees/Achievements')),
    Dependents: lazyLoad(() => import('../features/employees/Dependents')),
    SpecificInformation: lazyLoad(() => import('../features/employees/More/SpecificInformation')),
    Onboarding: lazyLoad(() => import('../features/employees/More/Onboarding')),
    Guidlines: lazyLoad(() => import('../features/employees/More/Guidlines')),
    TestReport: lazyLoad(() => import('../features/employees/More/TestReport')),
    ContractList: lazyLoad(()=> import('../features/employees/More/ContractList')),
    HealthRecord: lazyLoad(() => import('../features/employees/More/HealthRecord')),
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
  education: page.employees.Education,
  skills: page.employees.skills,
  courses: page.employees.courses,
  Achievements: page.employees.Achievements,
  Dependents: page.employees.Dependents,
  SpecificInformation: page.employees.SpecificInformation,
  Onboarding: page.employees.Onboarding,
  Guidlines: page.employees.Guidlines,
  TestReport: page.employees.TestReport,
  ContractList: page.employees.ContractList,
  HealthRecord: page.employees.HealthRecord,
});
