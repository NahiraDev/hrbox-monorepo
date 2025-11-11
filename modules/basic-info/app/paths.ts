import { createPaths } from '@hrbox/core/routes';

export const BasicInfoPaths = createPaths('/basic-info', {
  TechnicalDepartment: '/technical-departments',
    OrganizationDepartments: '/organization-departments',
  OrganizationalLocations: '/organizational-locations',
  AllEmployees: '/all-employees',
  SatisfactionStatus: '/satisfaction-status',
  PersonalInformation: '/personal-information',
  Documents: '/documents',
  Jobs: '/jobs',
  Educations: '/educations',
  Skills: '/skills',
  Courses: '/courses',
  Achievements: '/achievement',
  Dependents: '/dependents',
  OrganizationSpecificInformation: '/organization-specific-information',
  Onboarding: '/onboarding',
  Offboarding: '/offboarding',
  Guidelines: '/guidelines',
  TestReport: '/test-report',
  ContractList: '/contract-list',
  RequestList: '/request-list',
  HealthRecords: '/health-records',
  EmployeeSatisfactionCalendar: '/employee-satisfaction-calendar'
});
