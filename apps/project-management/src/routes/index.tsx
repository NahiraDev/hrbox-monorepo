import { lazyLoad } from "@hrbox/shared-navigations";

export const Dashboard = lazyLoad(() => import("../pages/Dashboard"));

export default Dashboard;
