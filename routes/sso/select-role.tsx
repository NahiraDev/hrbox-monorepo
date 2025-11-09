import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';
import { SelectRolePage } from '@hrbox/modules/sso/pages/SelectRole';

export const selectRoleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sso/select-role',
  beforeLoad: async ({ context }: any) => {
    if (!context?.auth?.user) {
      throw redirect({ to: '/sso/login' });
    }

    if (!context?.auth?.needsRoleSelection) {
      throw redirect({ to: '/sso/welcome' });
    }
  },
  component: SelectRolePage,
});