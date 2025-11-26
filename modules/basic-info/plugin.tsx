import type {ModulePlugin} from "@hrbox/modules/types";
import {RoleSlug} from "@hrbox/core/config/theme/roles";
import {Chart2, Briefcase, Building, LocationAdd, Profile2User, ReceiveSquare, Setting3} from "iconsax-reactjs";
import {lazyRouteComponent} from "@tanstack/react-router";
import {Paths} from "../paths";

const AllEmployees = lazyRouteComponent(() => import("./pages/employees/Employees"));
const OrganizationDepartments = lazyRouteComponent(() => import('./pages/departments/OrganizationDepartments'));
const TechnicalDepartments = lazyRouteComponent(() => import('./pages/departments/TechnicalDepartments'));
const OrganizationalLocations = lazyRouteComponent(() => import('./pages/departments/OrganizationalLocations'));
const TestReport = lazyRouteComponent(() => import('./pages/employees/More/TestReport'));
const HealthRecords = lazyRouteComponent(() => import('./pages/employees/More/HealthRecord'));
const Documents = lazyRouteComponent(() => import('./pages/employees/Documents'));
const Achievements = lazyRouteComponent(() => import('./pages/employees/Achievements'));
const RequestList = lazyRouteComponent(() => import('./pages/employees/More/RequestList'));
const Guidelines = lazyRouteComponent(() => import('./pages/employees/More/Guidelines'));
const Onboarding = lazyRouteComponent(() => import('./pages/employees/More/Onboarding'));
const Courses = lazyRouteComponent(() => import('./pages/employees/Courses'));
const Skills = lazyRouteComponent(() => import('./pages/employees/Skills'));
const Jobs = lazyRouteComponent(() => import('./pages/employees/Jobs'));
const Educations = lazyRouteComponent(() => import('./pages/employees/Education'));
const PersonalInformation = lazyRouteComponent(() => import('./pages/employees/PersonalInformation'));
const ContractList = lazyRouteComponent(() => import('./pages/employees/More/ContractList'));
const Dependents = lazyRouteComponent(() => import('./pages/employees/Dependents'));
const EmployeeSatisfactionCalendar = lazyRouteComponent(() => import('./pages/employees/EmployeeSatisfactionCalendar'));

// ============================================
// SubHeaders (Lazy Load)
// ============================================

const OrganizationDepartmentSubHeader = lazyRouteComponent(
    () => import('./subheaders/OrganizationDepartmentsSubHeader'),
);
const TechnicalDepartmentsSubHeader = lazyRouteComponent(() => import('./subheaders/TechnicalDepartmentsSubHeader'));
const OrganizationalLocationsSubHeader = lazyRouteComponent(
    () => import('./subheaders/OrganizationLocationSubHeader'),
);
const AllEmployeesSubHeader = lazyRouteComponent(
    () => import('./subheaders/EmployeesSubHeader'),
);

// ============================================
// Plugin Definition
// ============================================

export const BasicInfoPlugin: ModulePlugin = {
    name: "basic-info",
    version: "1.0.0",
    basePath: "/basic-info",
    layout: "base",
    description: "",
    author: "HRBox Team",
    routes: [
        {
            path: Paths.BasicInfo.AllEmployees,
            component: AllEmployees,
            layout: "base",
            meta: {
                title: "All Employees",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
            subHeader: AllEmployeesSubHeader,
        },
        {
            path: Paths.BasicInfo.OrganizationDepartments,
            component: OrganizationDepartments,
            layout: "base",
            meta: {
                title: "Organization Departments",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
            subHeader: OrganizationDepartmentSubHeader,
        },
        {
            path: Paths.BasicInfo.TechnicalDepartment,
            component: TechnicalDepartments,
            layout: "base",
            meta: {
                title: "Technical Departments",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
            subHeader: TechnicalDepartmentsSubHeader,
        },
        {
            path: Paths.BasicInfo.OrganizationalLocations,
            component: OrganizationalLocations,
            layout: "base",
            meta: {
                title: "Organizational Locations",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
            subHeader: OrganizationalLocationsSubHeader,
        },
        {
            path: Paths.BasicInfo.TestReport,
            component: TestReport,
            layout: "base",
            meta: {
                title: "Test Report",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.HealthRecords,
            component: HealthRecords,
            layout: "base",
            meta: {
                title: "Health Records",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Documents,
            component: Documents,
            layout: "base",
            meta: {
                title: "Documents",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Achievements,
            component: Achievements,
            layout: "base",
            meta: {
                title: "Achievements",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.RequestList,
            component: RequestList,
            layout: "base",
            meta: {
                title: "Request List",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Guidelines,
            component: Guidelines,
            layout: "base",
            meta: {
                title: "Guidelines",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Onboarding,
            component: Onboarding,
            layout: "base",
            meta: {
                title: "Onboarding",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Courses,
            component: Courses,
            layout: "base",
            meta: {
                title: "Courses",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Skills,
            component: Skills,
            layout: "base",
            meta: {
                title: "Skills",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Jobs,
            component: Jobs,
            layout: "base",
            meta: {
                title: "Jobs",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Educations,
            component: Educations,
            layout: "base",
            meta: {
                title: "Educations",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.PersonalInformation,
            component: PersonalInformation,
            layout: "base",
            meta: {
                title: "Personal Information",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.ContractList,
            component: ContractList,
            layout: "base",
            meta: {
                title: "Contract List",
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.Dependents,
            component: Dependents,
            layout: "base",
            meta: {
                title: "Dependents",
                requireAuth: true,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.BasicInfo.EmployeeSatisfactionCalendar,
            component: EmployeeSatisfactionCalendar,
            layout: "base",
            meta: {
                title: "Employee Satisfaction Calendar",
                requireAuth: true,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
    ],
    menu: [
        {
            id: "dashboard",
            label: "Dashboard",
            path: Paths.BasicInfo.Dashboard,
            icon: <Chart2 size="24" />,
        },
        {
            id: "organization-departments",
            label: "Organization Departments",
            path: Paths.BasicInfo.OrganizationDepartments,
            icon: <Building size="24" />,
        },
        {
            id: "technical-departments",
            label: "Technical Departments",
            path: Paths.BasicInfo.TechnicalDepartment,
            icon: <Building size="24" />,
        },
        {
            id: "organizational-locations",
            label: "Organizational Locations",
            path: Paths.BasicInfo.OrganizationalLocations,
            icon: <LocationAdd size="24" />,
        },
        {
            id: "all-employees",
            label: "All Employees",
            path: Paths.BasicInfo.AllEmployees,
            icon: <Profile2User size="24" />,
        },
        {
            id: "jobs",
            label: "Jobs",
            path: Paths.BasicInfo.Jobs,
            icon: <Briefcase size="24" />,
        },
        {
            id: "personal-information",
            label: "Personal Information",
            path: Paths.BasicInfo.PersonalInformation,
            icon: <Profile2User size="24" />,
        },
        {
            id: "documents",
            label: "Documents",
            path: Paths.BasicInfo.Documents,
            icon: <ReceiveSquare size="24" />,
        },
        {
            id: "skills",
            label: "Skills",
            path: Paths.BasicInfo.Skills,
            icon: <Briefcase size="24" />,
        },
        {
            id: "courses",
            label: "Courses",
            path: Paths.BasicInfo.Courses,
            icon: <Chart2 size="24" />,
        },
        {
            id: "achievements",
            label: "Achievements",
            path: Paths.BasicInfo.Achievements,
            icon: <ReceiveSquare size="24" />,
        },
        {
            id: "onboarding",
            label: "Onboarding",
            path: Paths.BasicInfo.Onboarding,
            icon: <Profile2User size="24" />,
        },
        {
            id: "guidelines",
            label: "Guidelines",
            path: Paths.BasicInfo.Guidelines,
            icon: <Setting3 size="24" />,
        },
        {
            id: "employee-satisfaction-calendar",
            label: "Employee Satisfaction Calendar",
            path: Paths.BasicInfo.EmployeeSatisfactionCalendar,
            icon: <Chart2 size="24" />,
        },
    ],
    requiredRoles: [RoleSlug.ORGANIZATION],
    requiredPermissions: [],

    prefetch: async () => {
        console.log("Prefetching Basic Info module...");
    },

    onModuleLoad: () => {
        console.log("Basic Info module loaded");
    },

    onModuleUnload: () => {
        console.log("Basic Info module unloaded");
    },
};

export default BasicInfoPlugin;