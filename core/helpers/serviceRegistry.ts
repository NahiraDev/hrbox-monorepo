import type { Reducer } from '@reduxjs/toolkit';
import type { RouteObject } from 'react-router-dom';
import type { ReactNode, LazyExoticComponent, ComponentType } from 'react';

export interface SubHeaderConfig {
  path: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

export interface ContentConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
}

export interface PluginModule {
  name: string;
  reducers?: Record<string, Reducer>;
  apis?: any[];
  routes?: RouteObject[];
  contents?: ContentConfig[];
  menu?: { label: string; path: string; icon?: ReactNode }[];
  subHeaders?: SubHeaderConfig[];
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
        middleware: [...(existing.middleware || []), ...(plugin.middleware || [])],
        subHeaders: [...(existing.subHeaders || []), ...(plugin.subHeaders || [])],
      });
    } else {
      this.plugins.set(plugin.name, plugin);
    }
  }

  getSubHeaderForPath(path: string): SubHeaderConfig | undefined {
    for (const plugin of this.plugins.values()) {
      if (plugin.subHeaders) {
        const matchedSubHeader = plugin.subHeaders.find((subHeader) => this.isPathMatch(path, subHeader.path));

        if (matchedSubHeader) {
          return matchedSubHeader;
        }
      }
    }

    return undefined;
  }
  getContentForPath(path: string): ContentConfig | undefined {
    for (const plugin of this.plugins.values()) {
      if (plugin.contents) {
        const matchedContent = plugin.contents.find((content) => this.isPathMatch(path, content.path));

        if (matchedContent) {
          return matchedContent;
        }
      }
    }

    return undefined;
  }

  getAllContents(): ContentConfig[] {
    const contents: ContentConfig[] = [];

    for (const plugin of this.plugins.values()) {
      if (plugin.contents) {
        contents.push(...plugin.contents);
      }
    }

    return contents;
  }
  getAllSubHeaders(): SubHeaderConfig[] {
    const subHeaders: SubHeaderConfig[] = [];

    for (const plugin of this.plugins.values()) {
      if (plugin.subHeaders) {
        subHeaders.push(...plugin.subHeaders);
      }
    }
    return subHeaders;
  }

  private isPathMatch(currentPath: string, pattern: string): boolean {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = currentPath.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) return false;

    return patternParts.every((part, index) => {
      if (part.startsWith(':')) return true;

      return part === pathParts[index];
    });
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

  getAllApis(): any[] {
    const apis = Array.from(this.plugins.values()).flatMap((p) => p.apis || []);

    return apis;
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

  getActiveMenu(moduleName: string) {
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
