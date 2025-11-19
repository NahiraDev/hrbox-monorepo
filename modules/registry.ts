import type { ModulePlugin, SubHeaderConfig } from "./types";

class ModuleRegistry {
  private modules: Map<string, ModulePlugin> = new Map();
  register(plugin: ModulePlugin) {
    if (this.modules.has(plugin.name)) {
      console.warn(
        `⚠️ Module "${plugin.name}" already registered, overwriting...`,
      );
    }

    this.modules.set(plugin.name, plugin);
    console.log(`✅ Module registered: ${plugin.name} v${plugin.version}`);

    if (plugin.onModuleLoad) {
      plugin.onModuleLoad();
    }
  }

  getModule(name: string): ModulePlugin | undefined {
    return this.modules.get(name);
  }

  getAllModules(): ModulePlugin[] {
    return Array.from(this.modules.values());
  }

  getModuleByPath(pathname: string): ModulePlugin | undefined {
    const basePath = pathname.split("/")[1];
    return Array.from(this.modules.values()).find(
      (module) => module.name === basePath || module.basePath === basePath,
    );
  }

  getModuleSubHeaders(moduleName: string): SubHeaderConfig[] {
    const module = this.getModule(moduleName);
    return module?.subHeaders ?? [];
  }

  getSubHeaderForPath(pathname: string): { component: any; props: any } | null {
    const allModules = this.getAllModules();

    for (const module of allModules) {
      if (module.routes) {
        const route = module.routes.find((r) => r.path === pathname);
        if (route?.subHeader) {
          return {
            component: route.subHeader,
            props: route.subHeaderProps || {},
          };
        }
      }

      if (module.subHeaders) {
        const subHeader = module.subHeaders.find((sh) => sh.path === pathname);
        if (subHeader) {
          return {
            component: subHeader.component,
            props: subHeader.props || {},
          };
        }
      }
    }

    return null;
  }

  getAllRoutes() {
    const routes: any[] = [];
    this.getAllModules().forEach((module) => {
      if (module.routes) {
        routes.push(...module.routes);
      }
    });
    return routes;
  }

  getModuleMenu(moduleName: string): any[] {
    const module = this.getModule(moduleName);
    return module?.menu ?? [];
  }

  getAllReducers() {
    const reducers: Record<string, any> = {};
    this.getAllModules().forEach((module) => {
      if (module.reducers) {
        Object.assign(reducers, module.reducers);
      }
    });
    return reducers;
  }

  getAllApis() {
    const apis: any[] = [];
    this.getAllModules().forEach((module) => {
      if (module.api) {
        apis.push({
          name: module.name,
          ...module.api,
        });
      }
    });
    return apis;
  }

  getModuleAccess(moduleName: string) {
    const module = this.getModule(moduleName);
    return {
      requiredRoles: module?.requiredRoles ?? [],
      requiredPermissions: module?.requiredPermissions ?? [],
    };
  }

  hasModuleAccess(
    moduleName: string,
    userRoles: string[],
    userPermissions: string[],
  ): boolean {
    const access = this.getModuleAccess(moduleName);

    if (access.requiredRoles.length > 0) {
      const hasRole = access.requiredRoles.some((role) =>
        userRoles.includes(role),
      );
      if (!hasRole) return false;
    }

    if (access.requiredPermissions.length > 0) {
      const hasPermission = access.requiredPermissions.some((perm) =>
        userPermissions.includes(perm),
      );
      if (!hasPermission) return false;
    }

    return true;
  }

  async runPrefetch() {
    const promises = this.getAllModules()
      .filter((module) => module.prefetch)
      .map(async (module) => {
        try {
          await module.prefetch?.();
          console.log(`✅ Prefetch completed: ${module.name}`);
        } catch (error) {
          console.error(`❌ Prefetch failed for ${module.name}:`, error);
        }
      });

    await Promise.all(promises);
  }

  unregister(name: string) {
    const module = this.modules.get(name);
    if (module?.onModuleUnload) {
      module.onModuleUnload();
    }
    this.modules.delete(name);
    console.log(`🗑️ Module unregistered: ${name}`);
  }
  clear() {
    this.getAllModules().forEach((module) => {
      if (module.onModuleUnload) {
        module.onModuleUnload();
      }
    });
    this.modules.clear();
    console.log("🗑️ All modules cleared");
  }
}

export const moduleRegistry = new ModuleRegistry();
