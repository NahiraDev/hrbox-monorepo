import { lazy } from "react";
import { Paths } from "@hrbox/modules/paths";

const Login = lazy(() => import('../pages/Login'));
const LoginByOtp = lazy(() => import('../pages/LoginByOtp'));
const Register = lazy(() => import('../pages/Register'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const OneTimePassword = lazy(() => import('../pages/OneTimePassword'));

export const SSOContents: any = [
  {
    path: Paths.SSO.login,
    component: Login,
  },
  {
    path: Paths.SSO.loginByOtp,
    component: LoginByOtp,
  },
  {
    path: Paths.SSO.register,
    component: Register,
  },
  {
    path: Paths.SSO.forgetPassword,
    component: ForgetPassword,
  },
  {
    path: Paths.SSO.resetPassword,
    component: ResetPassword,
  },
  {
    path: Paths.SSO.oneTimePassword,
    component: OneTimePassword,
  },
];
