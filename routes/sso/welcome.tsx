import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';
import { WelcomePage } from '@hrbox/modules/sso/pages/Welcome';

export const welcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sso/welcome',
  beforeLoad: async ({ context }: any) => {
    // درخواست کاربر لاگین شده و نقش انتخاب کرده باشد
    if (!context?.auth?.isAuthenticated) {
      throw redirect({ to: '/sso/login' });
    }

    if (context?.auth?.needsRoleSelection) {
      throw redirect({ to: '/sso/select-role' });
    }
  },
  component: WelcomePage,
});