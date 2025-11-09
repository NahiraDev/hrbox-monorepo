import type { ModulePlugin } from './types';

class ModuleRegistry {
  private modules: Map<string, ModulePlugin> = new Map();

  /**
   * ثبت یک ماژول
   */
  register(plugin: ModulePlugin) {
    if (this.modules.has(plugin.name)) {
      console.warn(`⚠️ Module "${plugin.name}" already registered, overwriting...`);
    }

    this.modules.set(plugin.name, plugin);
    console.log(`✅ Module registered: ${plugin.name} v${plugin.version}`);

    if (plugin.onModuleLoad) {
      plugin.onModuleLoad();
    }
  }

  /**
   * دریافت ماژول
   */
  getModule(name: string): ModulePlugin | undefined {
    return this.modules.get(name);
  }

  /**
   * دریافت تمام ماژول‌ها
   */
  getAllModules(): ModulePlugin[] {
    return Array.from(this.modules.values());
  }

  /**
   * دریافت ماژول بر اساس مسیر
   */
  getModuleByPath(pathname: string): ModulePlugin | undefined {
    const basePath = pathname.split('/')[1];
    return Array.from(this.modules.values()).find(
      (module) => module.name === basePath || module.basePath === basePath
    );
  }

  /**
   * دریافت تمام routes
   */
  getAllRoutes() {
    const routes: any[] = [];
    this.getAllModules().forEach((module) => {
      if (module.routes) {
        routes.push(...module.routes);
      }
    });
    return routes;
  }

  /**
   * دریافت منوی یک ماژول
   */
  getModuleMenu(moduleName: string): any[] {
    const module = this.getModule(moduleName);
    return module?.menu ?? [];
  }

  /**
   * دریافت تمام reducers
   */
  getAllReducers() {
    const reducers: Record<string, any> = {};
    this.getAllModules().forEach((module) => {
      if (module.reducers) {
        Object.assign(reducers, module.reducers);
      }
    });
    return reducers;
  }

  /**
   * دریافت تمام API endpoints
   */
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

  /**
   * دریافت دسترسی ماژول
   */
  getModuleAccess(moduleName: string) {
    const module = this.getModule(moduleName);
    return {
      requiredRoles: module?.requiredRoles ?? [],
      requiredPermissions: module?.requiredPermissions ?? [],
    };
  }

  /**
   * بررسی دسترسی کاربر به ماژول
   */
  hasModuleAccess(moduleName: string, userRoles: string[], userPermissions: string[]): boolean {
    const access = this.getModuleAccess(moduleName);

    // بررسی نقش‌ها
    if (access.requiredRoles.length > 0) {
      const hasRole = access.requiredRoles.some((role) =>
        userRoles.includes(role)
      );
      if (!hasRole) return false;
    }

    // بررسی مجوزها
    if (access.requiredPermissions.length > 0) {
      const hasPermission = access.requiredPermissions.some((perm) =>
        userPermissions.includes(perm)
      );
      if (!hasPermission) return false;
    }

    return true;
  }

  /**
   * اجرای prefetch برای تمام ماژول‌ها
   */
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
    console.log('🗑️ All modules cleared');
  }
}

export const moduleRegistry = new ModuleRegistry();