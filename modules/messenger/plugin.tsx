import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import { Briefcase, Building, Profile } from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";

const Home = lazyRouteComponent(() => import("@hrbox/modules/messenger/pages/Home"));
const Private = lazyRouteComponent(() => import("@hrbox/modules/messenger/pages/Private"));
const Group = lazyRouteComponent(() => import("@hrbox/modules/messenger/pages/Group"));
const Channel = lazyRouteComponent(() => import("@hrbox/modules/messenger/pages/Channel"));
const SaveMessage = lazyRouteComponent(() => import("@hrbox/modules/messenger/pages/SaveMessage"));

export const MessengerPlugin: ModulePlugin = {
  name: "messenger",
  version: "1.0.0",
  basePath: "/messenger",
  layout: "messenger",
  description: "Job Seeker Portal",
  author: "HRBox Team",

  routes: [
    {
      path: Paths.Messenger.Home,
      component: Home,
      layout: "messenger",
      meta: {
        title: "Home",
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER, RoleSlug.ORGANIZATION]
      }
    },
    {
      path: Paths.Messenger.Private,
      component: Private,
      layout: "messenger",
      meta: {
        title: "Private",
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER, RoleSlug.ORGANIZATION]
      }
    },
    {
      path: Paths.Messenger.Group,
      component: Group,
      layout: "messenger",
      meta: {
        title: "Group",
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER, RoleSlug.ORGANIZATION]
      }
    },
    {
      path: Paths.Messenger.SaveMessage,
      component: SaveMessage,
      layout: "messenger",
      meta: {
        title: "SaveMessage",
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER, RoleSlug.ORGANIZATION]
      }
    },
    {
      path: Paths.Messenger.Channel,
      component: Channel,
      layout: "messenger",
      meta: {
        title: "Channel",
        requireAuth: false,
        requiredRoles: [RoleSlug.JOB_SEEKER, RoleSlug.ORGANIZATION]
      }
    }
  ],

  // ============================================
  // Menu
  // ============================================
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/hrlink/dashboard",
      icon: <Profile size="24" />
    },
    {
      id: "resume",
      label: "Resume",
      path: "/hrlink/resume",
      icon: <Profile size="24" />
    },
    {
      id: "jobs",
      label: "Jobs",
      path: "/hrlink/jobs",
      icon: <Briefcase size="24" />
    },
    {
      id: "company",
      label: "Company",
      path: "/hrlink/company",
      icon: <Building size="24" />
    }
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
  }
};

export default MessengerPlugin;
