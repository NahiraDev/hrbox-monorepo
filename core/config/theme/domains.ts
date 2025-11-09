import { Panel } from "@core/config/theme/roles";

export enum Domain {
  HRLINK = 'hrlink',
  HRBOX = 'hrbox',
  SUPER_ADMIN = 'super-admin',
}

export interface DomainConfig {
  domain: Domain;
  hosts: string[];
  loginBg: string;
  logo: string;
  favicon: string;
  defaultPanel: Panel;
  supportedPanels: Panel[];
  theme: {
    primary: string;
    secondary: string;
  };
}

export const DOMAIN_CONFIGS: Record<Domain, DomainConfig> = {
  [Domain.HRLINK]: {
    domain: Domain.HRLINK,
    hosts: ['hrlink.ir', 'hrlink.me', 'localhost:3000'],
    loginBg: '/images/hrlink-login-bg.webp',
    logo: '/images/hrlink-logo.svg',
    favicon: '/images/hrlink-favicon.ico',
    defaultPanel: Panel.HRLINK,
    supportedPanels: [Panel.HRLINK],
    theme: {
      primary: '#0A9AD7',
      secondary: '#1E3363',
    },
  },
  [Domain.HRBOX]: {
    domain: Domain.HRBOX,
    hosts: ['hrbox.ir', 'hrbox.me', 'localhost:3001'],
    loginBg: '/images/hrbox-login-bg.webp',
    logo: '/images/hrbox-logo.svg',
    favicon: '/images/hrbox-favicon.ico',
    defaultPanel: Panel.HRBOX,
    supportedPanels: [Panel.HRBOX],
    theme: {
      primary: '#6366F1',
      secondary: '#1E293B',
    },
  },
  [Domain.SUPER_ADMIN]: {
    domain: Domain.SUPER_ADMIN,
    hosts: ['admin.hrbox.ir', 'admin.hrbox.me', 'localhost:3002'],
    loginBg: '/images/super-admin-login-bg.webp',
    logo: '/images/super-admin-logo.svg',
    favicon: '/images/super-admin-favicon.ico',
    defaultPanel: Panel.SUPER_ADMIN,
    supportedPanels: [Panel.SUPER_ADMIN],
    theme: {
      primary: '#EF4444',
      secondary: '#991B1B',
    },
  },
};

export function getCurrentDomain(): Domain {
  const hostname = window.location.hostname;

  for (const [domain, config] of Object.entries(DOMAIN_CONFIGS)) {
    if (config.hosts.some((host) => hostname.includes(host))) {
      return domain as Domain;
    }
  }

  return Domain.HRBOX;
}

export function getDomainConfig(domain?: Domain): DomainConfig {
  const currentDomain = domain || getCurrentDomain();
  return DOMAIN_CONFIGS[currentDomain];
}

export function getDefaultPanelForDomain(domain?: Domain): Panel {
  const config = getDomainConfig(domain);
  return config.defaultPanel;
}
