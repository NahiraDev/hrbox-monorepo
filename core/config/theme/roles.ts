export enum RoleSlug {
  JOB_SEEKER = 'job-seeker',
  ORGANIZATION = 'organization',
  SUPER_ADMIN = 'super-admin',
}

export enum Panel {
  HRLINK = 'hrlink',
  HRBOX = 'hrbox',
  SUPER_ADMIN = 'super-admin',
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
    nameFA: 'کارجو',
    nameEN: 'Job Seeker',
    panel: Panel.HRLINK,
    icon: '👤',
    defaultRoute: '/hrlink/dashboard',
    color: '#0A9AD7',
    description: 'دسترسی به پنل کارجویی',
  },
  [RoleSlug.ORGANIZATION]: {
    slug: RoleSlug.ORGANIZATION,
    nameFA: 'سازمانی',
    nameEN: 'Organization',
    panel: Panel.HRBOX,
    icon: '🏢',
    defaultRoute: '/hrbox/dashboard',
    color: '#6366F1',
    description: 'دسترسی به پنل مدیریت سازمانی',
  },
  [RoleSlug.SUPER_ADMIN]: {
    slug: RoleSlug.SUPER_ADMIN,
    nameFA: 'مدیر کل',
    nameEN: 'Super Admin',
    panel: Panel.SUPER_ADMIN,
    icon: '👑',
    defaultRoute: '/super-admin/dashboard',
    color: '#EF4444',
    description: 'دسترسی کامل به تمام سیستم',
  },
};

export function getRoleConfig(slug: RoleSlug): RoleConfig {
  return ROLE_CONFIGS[slug];
}

export function getRoleByPanel(panel: Panel): RoleSlug | null {
  for (const [slug, config] of Object.entries(ROLE_CONFIGS)) {
    if (config.panel === panel) {
      return slug as RoleSlug;
    }
  }
  return null;
}