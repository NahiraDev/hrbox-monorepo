import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';
import LoginPage from '@hrbox/modules/sso/pages/Login';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sso/login',
  beforeLoad: async ({ context }: any) => {
    // اگر لاگین کرده بود
    if (context?.auth?.isAuthenticated) {
      throw redirect({ to: '/sso/welcome' });
    }

    // اگر انتخاب نقش باقی مانده
    if (context?.auth?.needsRoleSelection) {
      throw redirect({ to: '/sso/select-role' });
    }
  },
  component: LoginPage,
});
