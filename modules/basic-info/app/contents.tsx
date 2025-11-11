import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { lazyRouteComponent } from "@tanstack/react-router";

const OrganizationDepartments = lazyRouteComponent(() => import('@module/basic-info/features/departments/OrganizationDepartments'));
const TechnicalDepartments = lazyRouteComponent(() => import('@module/basic-info/features/departments/TechnicalDepartments'));
const OrganizationalLocations = lazyRouteComponent(() => import('@module/basic-info/features/departments/OrganizationalLocations'));
const AllEmployees = lazyRouteComponent(() => import('@module/basic-info/features/employees/sub-header/EmployeesSubHeader'));
const TestReport = lazyRouteComponent(() => import('@module/basic-info/features/employees/More/TestReport'));
const HealthRecords = lazyRouteComponent(() => import('@module/basic-info/features/employees/More/HealthRecord'));
const Documents = lazyRouteComponent(() => import('@module/basic-info/features/employees/Documents'));
const Achievements = lazyRouteComponent(() => import('@module/basic-info/features/employees/Achievements'));
const RequestList = lazyRouteComponent(() => import('@module/basic-info/features/employees/More/RequestList'));
const Guidelines = lazyRouteComponent(() => import('@module/basic-info/features/employees/More/Guidelines'));
const Onboarding = lazyRouteComponent(() => import('@module/basic-info/features/employees/More/Onboarding'));
// const OrganizationSpecificInformation = lazyLoad(() => import('@module/basic-info/pages/employees/OrganizationSpecificInformation'));
const Courses = lazyRouteComponent(() => import('@module/basic-info/features/employees/Courses'));
const Skills = lazyRouteComponent(() => import('@module/basic-info/features/employees/Skills'));
const Jobs = lazyRouteComponent(() => import('@module/basic-info/features/employees/Jobs'));
const Educations = lazyRouteComponent(() => import('@module/basic-info/features/employees/Education'));
const PersonalInformation = lazyRouteComponent(() => import('@module/basic-info/features/employees/PersonalInformation'));
// const SatisfactionStatus = lazyLoad(() => import('@module/basic-info/pages/employees/SatisfactionStatus'));
const ContractList = lazyRouteComponent(() => import('@module/basic-info/features/employees/More/ContractList'));
const Dependents = lazyRouteComponent(() => import('@module/basic-info/features/employees/Dependents'));
const EmployeeSatisfactionCalendar = lazyRouteComponent(() => import('@module/basic-info/features/employees/EmployeeSatisfactionCalendar'));

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
