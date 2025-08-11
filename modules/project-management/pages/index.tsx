import { lazyLoad } from "@package/app-navigations";

export const Dashboard = lazyLoad(() => import("../features/Dashboard"));

export default Dashboard;
