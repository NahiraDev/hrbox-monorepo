import type { Reducer } from '@reduxjs/toolkit';
import type { RouteObject } from 'react-router-dom';
import type { Api } from '@reduxjs/toolkit/query/react';
import plugin from 'eslint-plugin-react';

export interface PluginModule {
  name: string;
  reducers?: Reducer;
  apis?: Api<any, any, any, any>[];
  routes?: RouteObject[];
  menu?: { label: string; path: string; icon?: React.ReactNode }[];
  middleware?: any[];
  dependencies?: string[];
  prefetch?: () => void | Promise<void>;
}

export class ServiceRegistry {
  private plugins = new Map<string, PluginModule>();

  registerPlugin(plugin: PluginModule) {
    const existing = this.plugins.get(plugin.name);

    if (existing) {
      this.plugins.set(plugin.name, {
        ...existing,
        ...plugin,
        routes: [...(existing.routes || []), ...(plugin.routes || [])],
        reducers: { ...(existing.reducers || {}), ...(plugin.reducers || {}) },
        apis: [...(existing.apis || []), ...(plugin.apis || [])],
        middleware: [
          ...(existing.middleware || []),
          ...(plugin.middleware || []),
        ],
      });
    } else {
      this.plugins.set(plugin.name, plugin);
    }
  }

  getModuleName() {
    for (const plugin of this.plugins.values()) {
      return plugin.name;
    }
  }

  getAllReducers(): Record<string, Reducer> {
    const reducers: Record<string, Reducer> = {};

    for (const plugin of this.plugins.values()) {
      if (plugin.reducers) {
        Object.assign(reducers, plugin.reducers);
      }
    }

    return reducers;
  }

  getAllApis(): Api<any, any, any, any>[] {
    return Array.from(this.plugins.values()).flatMap((p) => p.apis || []);
  }

  getAllRoutes(): RouteObject[] {
    const routes: RouteObject[] = [];

    for (const plugin of this.plugins.values()) {
      if (plugin.routes) {
        routes.push(...plugin.routes);
      }
    }

    return routes;
  }

  getActiveMenu(moduleName:string) {
    const plugin = this.plugins.get(moduleName);

    if (!plugin || !plugin.menu) return [];

    return plugin.menu || [];
  }

  async runPrefetch() {
    for (const plugin of this.plugins.values()) {
      if (plugin.prefetch) await plugin.prefetch();
    }
  }
}

export const serviceRegistry = new ServiceRegistry();
