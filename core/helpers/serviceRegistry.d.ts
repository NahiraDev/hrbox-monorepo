import type { Reducer } from '@reduxjs/toolkit';
import type { RouteObject } from 'react-router-dom';
import type { Api } from '@reduxjs/toolkit/query/react';
export interface PluginModule {
    name: string;
    reducers?: Record<string, Reducer>;
    apis?: Api<any, any, any, any>[];
    routes?: RouteObject[];
    middleware?: any[];
    dependencies?: string[];
    prefetch?: () => void | Promise<void>;
}
export declare class ServiceRegistry {
    private plugins;
    registerPlugin(plugin: PluginModule): void;
    unregisterPlugin(name: string): void;
    getAllReducers(): Record<string, Reducer>;
    getAllApis(): Api<any, any, any, any>[];
    getAllRoutes(): RouteObject[];
    runPrefetch(): Promise<void>;
}
export declare const serviceRegistry: ServiceRegistry;
//# sourceMappingURL=serviceRegistry.d.ts.map