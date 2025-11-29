import { lazyRouteComponent } from "@tanstack/react-router";
import { ModulePlugin } from "@hrbox/modules/types";
import { Paths } from "@hrbox/modules/paths";

const DashboardPage = lazyRouteComponent(() => import("./pages/Dashboard"));

export const PayrollPlugin: ModulePlugin = {
  name: "sso",
  version: "1.0.0",
  basePath: "/sso",
  layout: "auth",
  description: "Authentication & Authorization Module",
  author: "HRBox Team",
  routes: [
    {
      path: Paths.Payroll.login,
      component: DashboardPage,
      layout: "auth",
      meta: {
        title: "Login",
        requireAuth: false,
      },
    },

    {
      path: Paths.SSO.register,
      component: RegisterPage,
      layout: "empty",
      meta: {
        title: "Register",
        requireAuth: false,
      },
    },
    {
      path: Paths.SSO.loginByOtp,
      component: LoginByOtpPage,
      layout: "auth",
      meta: {
        title: "Login by Otp",
        requireAuth: false,
      },
    },
    {
      path: Paths.SSO.forgetPassword,
      component: ForgetPasswordPage,
      layout: "auth",
      meta: {
        title: "ForgetPassword",
        requireAuth: false,
      },
    },
    {
      path: Paths.SSO.SelectRole,
      component: SelectRolePage,
      layout: "base",
      meta: {
        title: "Select Role",
        requireAuth: true,
      },
    },
    {
      path: Paths.SSO.welcome,
      component: WelcomePage,
      layout: "base",
      meta: {
        title: "Welcome",
        requireAuth: true,
      },
    },
  ],

  requiredRoles: [],
  requiredPermissions: [],

  prefetch: async () => {
    console.log("Prefetching SSO module...");
  },

  onModuleLoad: () => {
    console.log("SSO module loaded");
  },

  onModuleUnload: () => {
    console.log("SSO module unloaded");
  },
};

export default SSOPlugin;
