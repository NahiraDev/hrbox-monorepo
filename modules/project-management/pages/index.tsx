import { lazyLoad } from "core";

export const Dashboard = lazyLoad(() => import("./Dashboard/Dashboard"));

export default Dashboard;
