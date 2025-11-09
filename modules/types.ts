import type { ComponentType, LazyExoticComponent } from 'react';
import type { Panel, RoleSlug } from '@hrbox/core/config/theme';

export interface ModuleMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: ModuleMenuItem[];
}

export interface ModuleRoute {
  path: string;
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  layout?: 'base' | 'auth' | 'empty';
  meta?: {
    title?: string;
    description?: string;
    requireAuth?: boolean;
    requiredRoles?: RoleSlug[];
    requiredPermissions?: string[];
  };
}

export interface ModuleSubHeader {
  path: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

export interface ModuleConfig {
  name: string;
  basePath: string;
  layout?: 'base' | 'auth' | 'empty';

  // محتوا
  routes?: ModuleRoute[];
  menu?: ModuleMenuItem[];
  subHeaders?: ModuleSubHeader[];

  // Redux
  reducers?: Record<string, any>;

  // API
  api?: {
    baseUrl?: string;
    endpoints?: Record<string, string>;
  };

  // دسترسی
  requiredRoles?: RoleSlug[];
  requiredPermissions?: string[];

  // هوک‌ها
  prefetch?: () => Promise<void>;
  onModuleLoad?: () => void;
  onModuleUnload?: () => void;
}

/**
 * Plugin Interface - برای تمام ماژول‌ها
 */
export interface ModulePlugin extends ModuleConfig {
  version: string;
  author?: string;
  description?: string;
}