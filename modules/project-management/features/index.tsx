import { lazyLoad } from 'core';

export const Dashboard = lazyLoad(() => import('./Dashboard'));

export default Dashboard;
