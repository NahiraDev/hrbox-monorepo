import { rootRoute } from '~/routes/__root';
import LoginPage from '@hrbox/modules/sso/pages/Login';
import { createRoute } from '@tanstack/react-router';
import { Paths } from '@hrbox/modules/paths';

export const dashboardHRLinkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.HRLink.Dashboard,
  component: LoginPage,
});
