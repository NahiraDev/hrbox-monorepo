import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import { Briefcase, Building, Profile } from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";

const Home = lazyRouteComponent(() => import("./pages/Home"));

export const MessengerPlugin: ModulePlugin = {
  name: "messenger",
  version: "1.0.0",
  basePath: "/messenger",
  layout: "base",
  description: "Job Seeker Portal",
  author: "HRBox Team",

  routes: [
    {
      path: Paths.Messenger.Home,
      component: Home,
      layout: "base",
      meta: {
        title: "Dashboard",
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER],
      },
    },
  ],

  // ============================================
  // Menu
  // ============================================
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/hrlink/dashboard",
      icon: <Profile size="24" />,
    },
    {
      id: "resume",
      label: "Resume",
      path: "/hrlink/resume",
      icon: <Profile size="24" />,
    },
    {
      id: "jobs",
      label: "Jobs",
      path: "/hrlink/jobs",
      icon: <Briefcase size="24" />,
    },
    {
      id: "company",
      label: "Company",
      path: "/hrlink/company",
      icon: <Building size="24" />,
    },
  ],

  requiredRoles: [RoleSlug.JOB_SEEKER],
  requiredPermissions: [],

  prefetch: async () => {
    console.log("Prefetching Messenger module...");
  },

  onModuleLoad: () => {
    console.log("Messenger module loaded");
  },

  onModuleUnload: () => {
    console.log("Messenger module unloaded");
  },
};

export default MessengerPlugin;
