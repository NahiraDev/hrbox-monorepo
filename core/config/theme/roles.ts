export enum RoleSlug {
  JOB_SEEKER = "job-seeker",
  ORGANIZATION = "organization"
}

export enum Panel {
  HRLINK = "hrlink",
  HRBOX = "hrbox"
}

export interface RoleConfig {
  slug: RoleSlug;
  nameFA: string;
  nameEN: string;
  panel: Panel;
  icon: string;
  defaultRoute: string;
  color: string;
  description: string;
}

export const ROLE_CONFIGS: Record<RoleSlug, RoleConfig> = {
  [RoleSlug.JOB_SEEKER]: {
    slug: RoleSlug.JOB_SEEKER,
    nameFA: "کارجو",
    nameEN: "Job Seeker",
    panel: Panel.HRLINK,
    icon: "👤",
    defaultRoute: "/hrlink/dashboard",
    color: "#0A9AD7",
    description: "دسترسی به پنل کارجویی"
  },
  [RoleSlug.ORGANIZATION]: {
    slug: RoleSlug.ORGANIZATION,
    nameFA: "سازمانی",
    nameEN: "Organization",
    panel: Panel.HRBOX,
    icon: "🏢",
    defaultRoute: "/hrbox/dashboard",
    color: "#0A9AD7",
    description: "دسترسی به پنل مدیریت سازمانی"
  }
};

export function getRoleConfig(slug: RoleSlug): RoleConfig {
  const config = ROLE_CONFIGS[slug];

  if (!config) {
    console.warn(`⚠️ Role config not found for: ${slug}, using default`);
    return ROLE_CONFIGS[RoleSlug.JOB_SEEKER];
  }

  return config;
}