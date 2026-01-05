import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme/roles";
import { Paths } from "@hrbox/modules/paths";
import {
  Briefcase,
  Building,
  Chart,
  Chart2,
  LocationAdd,
  Profile2User,
  ReceiveSquare,
  Setting3,
} from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { lazy } from "react";


const Dashboard = lazyRouteComponent(
  () => import("./pages/Dashboard/Dashboard")
);
const Projects = lazyRouteComponent(
  () => import("./pages/Projects/Projects")
);
// ============================================
// SubHeaders (Lazy Load)
// ============================================

const DashboardHeader = lazy(
  () => import("./subheader/DashboardHeader")
);

export const ProjectManagementPlugin: ModulePlugin = {
  name: "project-management",
  version: "1.0.0",
  basePath: "/project-management",
  layout: "base",
  description: "",
  author: "HRBox Team",
  routes: [
    {
      path: Paths.ProjectManagement.Dashboard,
      component: Dashboard,
      layout: "base",
      meta: {
        title: "Dashboard",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
      subHeader: DashboardHeader,
      subHeaderProps:{
        title:"Dashboard",
        icon:<Chart/>
      }
    },
    {
      path: Paths.ProjectManagement.Projects,
      component: Projects,
      layout: "base",
      meta: {
        title: "Projects",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION],
      },
    },
  ],
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: Paths.ProjectManagement.Dashboard,
      icon: <Chart2 size="24" />,
    },
    {
      id: "organization-departments",
      label: "Organization Departments",
      path: Paths.ProjectManagement.OrganizationDepartments,
      icon: <Building size="24" />,
    },
    {
      id: "technical-departments",
      label: "Technical Departments",
      path: Paths.ProjectManagement.TechnicalDepartment,
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

export default ProjectManagementPlugin;
