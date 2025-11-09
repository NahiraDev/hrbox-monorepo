import React, { ComponentType, LazyExoticComponent } from 'react';

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

  routes?: ModuleRoute[];
  menu?: ModuleMenuItem[];
  subHeaders?: ModuleSubHeader[];

  reducers?: Record<string, any>;

  api?: {
    baseUrl?: string;
    endpoints?: Record<string, string>;
  };

  requiredRoles?: RoleSlug[];
  requiredPermissions?: string[];

  prefetch?: () => Promise<void>;
  onModuleLoad?: () => void;
  onModuleUnload?: () => void;
}

export interface ModulePlugin extends ModuleConfig {
  version: string;
  author?: string;
  description?: string;
}