import { lazyLoad } from '@core/routes';

import { BasicInfoPaths } from '@module/basic-info/app/paths';

const OrganizationDepartments = lazyLoad(() => import('@module/basic-info/features/departments/OrganizationDepartments'));
const TechnicalDepartments = lazyLoad(() => import('@module/basic-info/features/departments/TechnicalDepartments'));
const OrganizationalLocations = lazyLoad(() => import('@module/basic-info/features/departments/OrganizationalLocations'));
const AllEmployees = lazyLoad(() => import('@module/basic-info/features/employees/sub-header/EmployeesSubHeader'));
const TestReport = lazyLoad(() => import('@module/basic-info/features/employees/More/TestReport'));
const HealthRecords = lazyLoad(() => import('@module/basic-info/features/employees/More/HealthRecord'));
const Documents = lazyLoad(() => import('@module/basic-info/features/employees/Documents'));
const Achievements = lazyLoad(() => import('@module/basic-info/features/employees/Achievements'));
const RequestList = lazyLoad(() => import('@module/basic-info/features/employees/More/RequestList'));
const Guidelines = lazyLoad(() => import('@module/basic-info/features/employees/More/Guidelines'));
const Onboarding = lazyLoad(() => import('@module/basic-info/features/employees/More/Onboarding'));
// const OrganizationSpecificInformation = lazyLoad(() => import('@module/basic-info/features/employees/OrganizationSpecificInformation'));
const Courses = lazyLoad(() => import('@module/basic-info/features/employees/Courses'));
const Skills = lazyLoad(() => import('@module/basic-info/features/employees/Skills'));
const Jobs = lazyLoad(() => import('@module/basic-info/features/employees/Jobs'));
const Educations = lazyLoad(() => import('@module/basic-info/features/employees/Education'));
const PersonalInformation = lazyLoad(() => import('@module/basic-info/features/employees/PersonalInformation'));
// const SatisfactionStatus = lazyLoad(() => import('@module/basic-info/features/employees/SatisfactionStatus'));
const ContractList = lazyLoad(() => import('@module/basic-info/features/employees/More/ContractList'));
const Dependents = lazyLoad(() => import('@module/basic-info/features/employees/Dependents'));
const EmployeeSatisfactionCalendar = lazyLoad(() => import('@module/basic-info/features/employees/EmployeeSatisfactionCalendar'));

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
