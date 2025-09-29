import { lazyLoad , createProjectRoutes} from '@core/routes';
import { BasicInfoPaths } from '@module/basic-info/app/paths';

export const page = {
  departments: {
    organization: lazyLoad(() => import('@module/basic-info/features/departments/OrganizationDepartments')),
    technical: lazyLoad(() => import('@module/basic-info/features/departments/TechnicalDepartments')),
    location: lazyLoad(() => import('@module/basic-info/features/departments/OrganizationalLocations')),
    employees: lazyLoad(() => import('@module/basic-info/features/employees/EmployeeSatisfactionCalendar')),
  },
  employees: {
    allEmployees: lazyLoad(() => import('@module/basic-info/features/employees/Employees')),
    satisfaction: lazyLoad(() => import('@module/basic-info/features/employees/EmployeeSatisfactionCalendar')),
    personalInformation: lazyLoad(() => import('@module/basic-info/features/employees/PersonalInformation')),
    Documents: lazyLoad(() => import('@module/basic-info/features/employees/Documents')),
    Jobs: lazyLoad(() => import('@module/basic-info/features/employees/Jobs')),
    Education: lazyLoad(() => import('@module/basic-info/features/employees/Education')),
    skills: lazyLoad(() => import('@module/basic-info/features/employees/Skills')),
    courses: lazyLoad(() => import('@module/basic-info/features/employees/Courses')),
    Achievements: lazyLoad(() => import('@module/basic-info/features/employees/Achievements')),
    Dependents: lazyLoad(() => import('@module/basic-info/features/employees/Dependents')),
    SpecificInformation: lazyLoad(() => import('@module/basic-info/features/employees/More/SpecificInformation')),
    Onboarding: lazyLoad(() => import('@module/basic-info/features/employees/More/Onboarding')),
    Guidelines: lazyLoad(() => import('@module/basic-info/features/employees/More/Guidelines')),
    TestReport: lazyLoad(() => import('@module/basic-info/features/employees/More/TestReport')),
    ContractList: lazyLoad(() => import('@module/basic-info/features/employees/More/ContractList')),
    HealthRecord: lazyLoad(() => import('@module/basic-info/features/employees/More/HealthRecord')),
    RequestList: lazyLoad(() => import('@module/basic-info/features/employees/More/RequestList')),
  },
};

export const BasicInfoRoutes = createProjectRoutes('/basic-info', {
  [BasicInfoPaths.OrganizationDepartments]: page.departments.organization,
  [BasicInfoPaths.TechnicalDepartment]: page.departments.technical,
  [BasicInfoPaths.OrganizationalLocations]: page.departments.location,
  [BasicInfoPaths.SatisfactionStatus]: page.employees.satisfaction,
  [BasicInfoPaths.PersonalInformation]: page.employees.personalInformation,
  [BasicInfoPaths.AllEmployees]: page.employees.allEmployees,
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
