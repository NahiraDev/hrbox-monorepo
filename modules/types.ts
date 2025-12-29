import React, { ComponentType, LazyExoticComponent } from "react";
import { RoleSlug } from "@hrbox/core/config/theme";

export interface SubHeaderConfig {
  path: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

export interface ModuleMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: ModuleMenuItem[];
  requiredRoles?: RoleSlug[];
  requiredPermissions?: string[];
}

export interface ModuleRoute {
  path: string;
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  layout?: "base" | "auth" | "empty" | "framed" | "messenger";
  meta?: {
    title?: string;
    description?: string;
    requireAuth?: boolean;
    requiredRoles?: RoleSlug[];
    requiredPermissions?: string[];
  };
  subHeader?: ComponentType<any>;
  subHeaderProps?: Record<string, any>;
}

export interface ModuleConfig {
  name: string;
  basePath: string;
  layout?: "base" | "auth" | "empty" | "framed" | "messenger";

  routes?: ModuleRoute[];

  menu?: ModuleMenuItem[];

  subHeaders?: SubHeaderConfig[];

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