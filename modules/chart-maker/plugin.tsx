import type { ModulePlugin } from '@hrbox/modules/types';
import { RoleSlug } from '@hrbox/core/config/theme';
import { lazyRouteComponent } from '@tanstack/react-router';
import { Paths } from "@hrbox/modules/paths";

const OrganizationChart = lazyRouteComponent(() => import('./pages/OrgChart'));
const OrganizationChartList = lazyRouteComponent(() => import('./pages/OrganizationChartList'));


export const ChartMakerPlugin: ModulePlugin = {
    name: 'chart-maker',
    version: '1.0.0',
    basePath: '/chart-maker',
    layout: 'base',
    description: 'Chart Maker Panel',
    author: 'Nahira Team',
    routes: [
        {
            path: Paths.ChartMaker.ProcessMaker,
            component: OrganizationChart,
            layout: 'base',
            meta: {
                title: 'OrganizationChart',
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        },
        {
            path: Paths.ChartMaker.ProcessList,
            component: OrganizationChartList,
            layout: 'base',
            meta: {
                title: 'Organization Chart List',
                requireAuth: false,
                requiredRoles: [RoleSlug.ORGANIZATION],
            },
        }
    ],

    requiredRoles: [RoleSlug.ORGANIZATION],
    requiredPermissions: [],

    prefetch: async () => {
        console.log('Prefetching Chart Maker module...');
    },

    onModuleLoad: () => {
        console.log('Chart Maker module loaded');
    },

    onModuleUnload: () => {
        console.log('Chart Maker module unloaded');
    },
};

export default ChartMakerPlugin;