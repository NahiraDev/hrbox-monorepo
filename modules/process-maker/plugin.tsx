import type { ModulePlugin } from "@hrbox/modules/types";
import { RoleSlug } from "@hrbox/core/config/theme";
import { Profile } from "iconsax-reactjs";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from "@hrbox/modules/paths";

const DashboardPage = lazyRouteComponent(() => import("./pages/Dashboard"));
const ProcessMaker = lazyRouteComponent(() => import("./pages/ProcessMaker"));
const ProcessList = lazyRouteComponent(() => import("./pages/ProcessList"));

const ProcessListSubHeader = lazyRouteComponent(() => import("./subheaders/ProcessListSubHeader"));
const DashboardSubHeader = lazyRouteComponent(() => import("./subheaders/DashboardSubHeader"));

export const ProcessMakerPlugin: ModulePlugin = {
  name: "process-maker",
  version: "1.0.0",
  basePath: "/process-maker",
  layout: "framed",
  description: "Process Maker Panel",
  author: "Nahira Team",
  routes: [
    {
      path: Paths.ProcessMaker.Dashboard,
      component: DashboardPage,
      layout: "framed",
      meta: {
        title: "Dashboard",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: DashboardSubHeader
    },
    {
      path: Paths.ProcessMaker.ProcessList,
      component: ProcessList,
      layout: "framed",
      meta: {
        title: "Process List",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      },
      subHeader: ProcessListSubHeader
    },
    {
      path: Paths.ProcessMaker.ProcessExperience,
      component: ProcessMaker,
      layout: "framed",
      meta: {
        title: "ProcessExperience",
        requireAuth: false,
        requiredRoles: [RoleSlug.ORGANIZATION]
      }
    }
  ],
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: Paths.ProcessMaker.Dashboard,
      icon: <Profile size="24" />
    },
    {
      id: "resume",
      label: "Process List",
      path: Paths.ProcessMaker.ProcessList,
      icon: <Profile size="24" />
    }
  ],

  requiredRoles: [RoleSlug.ORGANIZATION],
  requiredPermissions: [],

  prefetch: async () => {
    console.log("Prefetching Process Maker module...");
  },

  onModuleLoad: () => {
    console.log("Process Maker module loaded");
  },

  onModuleUnload: () => {
    console.log("Process Maker module unloaded");
  }
};

export default ProcessMakerPlugin;