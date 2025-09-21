import { lazyLoad } from 'core/index';
import { createProjectRoutes } from 'core/index';
import { BasicInfoPaths } from './paths';

export const page = {
  departments: {
    organization: lazyLoad(() => import('../features/departments/OrganizationDepartments')),
    technical: lazyLoad(() => import('../features/departments/TechnicalDepartments')),
    location: lazyLoad(() => import('../features/departments/OrganizationalLocations')),
    employees: lazyLoad(() => import('../features/employees/EmployeeSatisfactionCalendar')),
  },
  employees: {
    allEmployees: lazyLoad(() => import('../features/employees/Employees')),
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
    Guidelines: lazyLoad(() => import('../features/employees/More/Guidelines')),
    TestReport: lazyLoad(() => import('../features/employees/More/TestReport')),
    ContractList: lazyLoad(() => import('../features/employees/More/ContractList')),
    HealthRecord: lazyLoad(() => import('../features/employees/More/HealthRecord')),
    RequestList: lazyLoad(() => import('../features/employees/More/RequestList')),
  },
};

export const BasicInfoRoutes = createProjectRoutes('/basic-info', {
  [BasicInfoPaths.OrganizationDepartments]: page.departments.organization,
  [BasicInfoPaths.TechnicalDepartment]: page.departments.technical,
  [BasicInfoPaths.OrganizationalLocations]: page.departments.location,
  [BasicInfoPaths.SatisfactionStatus]: page.employees.satisfaction,
  [BasicInfoPaths.PersonalInformation]: page.employees.personalInformation,
  [BasicInfoPaths.AllEmployees]: page.departments.allEmployees,
  [BasicInfoPaths.Documents]: page.employees.Documents,
  [BasicInfoPaths.Jobs]: page.employees.Jobs,
  [BasicInfoPaths.Educations]: page.employees.Education,
  [BasicInfoPaths.Skills]: page.employees.skills,
  [BasicInfoPaths.Courses]: page.employees.courses,
  [BasicInfoPaths.Achievements]: page.employees.Achievements,
  [BasicInfoPaths.Dependents]: page.employees.Dependents,
  [BasicInfoPaths.OrganizationSpecificInformation]: page.employees.SpecificInformation,
  [BasicInfoPaths.Onboarding]: page.employees.Onboarding,
  [BasicInfoPaths.Guidelines]: page.employees.Guidelines,
  [BasicInfoPaths.TestReport]: page.employees.TestReport,
  [BasicInfoPaths.ContractList]: page.employees.ContractList,
  [BasicInfoPaths.HealthRecords]: page.employees.HealthRecord,
  [BasicInfoPaths.RequestList]: page.employees.RequestList,
});
