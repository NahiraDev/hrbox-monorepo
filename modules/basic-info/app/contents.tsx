import { lazyLoad } from 'core/routes';

import { BasicInfoPaths } from './paths';

const OrganizationDepartments = lazyLoad(() => import('../features/departments/OrganizationDepartments'));
const TechnicalDepartments = lazyLoad(() => import('../features/departments/TechnicalDepartments'));
const OrganizationalLocations = lazyLoad(() => import('../features/departments/OrganizationalLocations'));
const AllEmployees = lazyLoad(() => import('../features/employees/sub-header/EmployeesSubHeader'));
const TestReport = lazyLoad(() => import('../features/employees/More/TestReport'));
const HealthRecords = lazyLoad(() => import('../features/employees/More/HealthRecord'));
const Documents = lazyLoad(() => import('../features/employees/Documents'));
const Achievements = lazyLoad(() => import('../features/employees/Achievements'));
const RequestList = lazyLoad(() => import('../features/employees/More/RequestList'));
const Guidelines = lazyLoad(() => import('../features/employees/More/Guidelines'));
const Onboarding = lazyLoad(() => import('../features/employees/More/Onboarding'));
// const OrganizationSpecificInformation = lazyLoad(() => import('../features/employees/OrganizationSpecificInformation'));
const Courses = lazyLoad(() => import('../features/employees/Courses'));
const Skills = lazyLoad(() => import('../features/employees/Skills'));
const Jobs = lazyLoad(() => import('../features/employees/Jobs'));
const Educations = lazyLoad(() => import('../features/employees/Education'));
const PersonalInformation = lazyLoad(() => import('../features/employees/PersonalInformation'));
// const SatisfactionStatus = lazyLoad(() => import('../features/employees/SatisfactionStatus'));
const ContractList = lazyLoad(() => import('../features/employees/More/ContractList'));
const Dependents = lazyLoad(() => import('../features/employees/Dependents'));
const EmployeeSatisfactionCalendar = lazyLoad(() => import('../features/employees/EmployeeSatisfactionCalendar'));

export const BasicInfoContents: any = [
  {
    path: BasicInfoPaths.OrganizationDepartments,
    component: OrganizationDepartments,
  },
  {
    path: BasicInfoPaths.TechnicalDepartment,
    component: TechnicalDepartments,
  },
  {
    path: BasicInfoPaths.OrganizationalLocations,
    component: OrganizationalLocations,
  },
  {
    path: BasicInfoPaths.AllEmployees,
    component: AllEmployees,
  },
  {
    path: BasicInfoPaths.TestReport,
    component: TestReport,
  },
  {
    path: BasicInfoPaths.HealthRecords,
    component: HealthRecords,
  },
  {
    path: BasicInfoPaths.Documents,
    component: Documents,
  },
  {
    path: BasicInfoPaths.Achievements,
    component: Achievements,
  },
  {
    path: BasicInfoPaths.RequestList,
    component: RequestList,
  },
  {
    path: BasicInfoPaths.Guidelines,
    component: Guidelines,
  },
  {
    path: BasicInfoPaths.Onboarding,
    component: Onboarding,
  },
  {
    path: BasicInfoPaths.Courses,
    component: Courses,
  },
  {
    path: BasicInfoPaths.Skills,
    component: Skills,
  },
  {
    path: BasicInfoPaths.Educations,
    component: Educations,
  },
  {
    path: BasicInfoPaths.Jobs,
    component: Jobs,
  },
  // {
  //   path: BasicInfoPaths.SatisfactionStatus,
  //   component: SatisfactionStatus,
  // },
  {
    path: BasicInfoPaths.PersonalInformation,
    component: PersonalInformation,
  },
  {
    path: BasicInfoPaths.ContractList,
    component: ContractList,
  },
  {
    path: BasicInfoPaths.Dependents,
    component: Dependents,
  },
  {
    path: BasicInfoPaths.EmployeeSatisfactionCalendar,
    component: EmployeeSatisfactionCalendar,
  },

  // {
  //   path: BasicInfoPaths.OrganizationSpecificInformation,
  //   component: OrganizationSpecificInformation,
  // },
];
