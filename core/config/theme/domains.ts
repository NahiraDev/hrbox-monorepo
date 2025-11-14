// ============================================
// core/config/theme/domains.ts (COMPLETE)
// ============================================

import { Panel } from './roles';


export type Domain = "front.hrbox.me" | 'react.hrbox.me' | 'super-admin'


export interface DomainConfig {
  domain: string;
  panel: Panel;
  hosts: string[];

  logo: string;
  logoMobile: string;
  favicon: string;

  title: string;
  description: string;

  loginBg: {
    light: string;
    dark: string;
  };
  panelBg:{
    light: string;
    dark: string;
  }
  theme: {
    light: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
    };
    dark: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
    };
  };
}

// ============================================
// Domain Configurations
// ============================================

export const DOMAIN_CONFIGS: Record<Panel, DomainConfig> = {
  hrlink: {
    domain: 'hrlink',
    panel: Panel.HRLINK,
    hosts: [
      'hrlink.ir',
      'www.hrlink.ir',
      'hrlink.me',
      'front.hrbox.me',
      'localhost',
    ],

    logo: '/images/hrlink/logo.svg',
    logoMobile: '/images/hrlink/logo.svg',
    favicon: '/images/hrlink/favicon.ico',

    title: 'HRLink - استخدام و کاریابی',
    description: 'پلتفرم جامع استخدام و کاریابی',

    loginBg: {
      light: '/images/hrlink/login-bg-light.webp',
      dark: '/images/hrlink/login-bg-dark.webp',
    },
    panelBg:{
      light: '/images/hrlink/panel-bg-light.webp',
      dark: '/images/hrlink/panel-bg-dark.webp',
    },
    theme: {
      light: {
        primary: '#0A9AD7',
        secondary: '#1E3363',
        background: '#F5FBFE',
        surface: '#FFFFFF',
      },
      dark: {
        primary: '#044566',
        secondary: '#FFFFFF',
        background: '#04070E',
        surface: '#01101A',
      },
    }
  },

  hrbox: {
    domain: 'hrbox',
    panel: Panel.HRBOX,
    hosts: [
      'hrbox.ir',
      'www.hrbox.ir',
      'hrbox.me',
      'react.hrbox.me',
    ],

    logo: '/images/hrbox/logo.svg',
    logoMobile: '/images/hrbox/logo.svg',
    favicon: '/images/hrbox/favicon.ico',

    title: 'HRBox - مدیریت منابع انسانی',
    description: 'سیستم جامع مدیریت منابع انسانی',

    loginBg: {
      light: '/images/hrbox/login-bg-dark.webp',
      dark: '/images/hrbox/login-bg-dark.webp',
    },
    panelBg: {
      light: '/images/hrbox/panel-bg-dark.webp',
      dark: '/images/hrbox/panel-bg-dark.webp',
    },

    theme: {
      light: {
        primary: '#0A9AD7',
        secondary: '#1E293B',
        background: '#F8FAFC',
        surface: '#FFFFFF',
      },
      dark: {
        primary: '#044566',
        secondary: '#FFFFFF',
        background: '#0F172A',
        surface: '#1E293B',
      },
    }
  },

  // Super Admin Configuration
  'super-admin': {
    domain: 'super-admin',
    panel: Panel.SUPER_ADMIN,
    hosts: [
      'admin.hrbox.ir',
      'admin.hrlink.ir',
      'localhost:3002',
    ],

    logo: '/images/admin/logo.svg',
    logoMobile: '/images/admin/logo-mobile.svg',
    favicon: '/images/admin/favicon.ico',

    title: 'Super Admin - مدیریت سیستم',
    description: 'پنل مدیریت کل سیستم',

    loginBg: {
      light: '/images/admin/login-bg-dark.webp',
      dark: '/images/admin/login-bg-dark.webp',
    },

    theme: {
      light: {
        primary: '#EF4444',
        secondary: '#991B1B',
        background: '#FEF2F2',
        surface: '#FFFFFF',
      },
      dark: {
        primary: '#F87171',
        secondary: '#FFFFFF',
        background: '#1F1917',
        surface: '#292524',
      },
    },

    ogImage: '/images/admin/og-image.jpg',
  },
};

// ============================================
// Helper Functions
// ============================================

/**
 * تشخیص دامنه فعلی
 */
export function getCurrentDomain(): Panel {
  const hostname = window.location.hostname;
  const port = window.location.port;

  console.log('🔍 Domain Detection:');
  console.log('   hostname:', hostname);
  console.log('   port:', port);


  if (
      hostname === 'front.hrbox.me' ||
      hostname === 'hrlink.ir' ||
      hostname === 'www.hrlink.ir' ||
      hostname === 'hrlink.me'
  ) {
    console.log('✅ Detected: HRLINK (from domain)');
    return Panel.HRLINK;
  }

  if (
      hostname === 'react.hrbox.me' ||
      hostname === 'hrbox.ir' ||
      hostname === 'www.hrbox.ir' ||
      hostname === 'hrbox.me'
  ) {
    console.log('✅ Detected: HRBOX (from domain)');
    return Panel.HRBOX;
  }

  if (
      hostname === 'admin.hrbox.me' ||
      hostname === 'admin.hrbox.ir' ||
      hostname === 'admin.hrlink.ir'
  ) {
    console.log('✅ Detected: SUPER_ADMIN (from domain)');
    return Panel.SUPER_ADMIN;
  }

  if (hostname === 'localhost') {
    if (port === '3000') {
      console.log('✅ Detected: HRLINK (localhost:3000)');
      return Panel.HRLINK;
    }

    if (port === '3001') {
      console.log('✅ Detected: HRBOX (localhost:3001)');
      return Panel.HRBOX;
    }

    if (port === '3002') {
      console.log('✅ Detected: SUPER_ADMIN (localhost:3002)');
      return Panel.SUPER_ADMIN;
    }
  }

  // 5. بررسی Environment Variable
  const viteHrlinkUrl = import.meta.env.VITE_HRLINK_URL;
  if (viteHrlinkUrl && hostname.includes(viteHrlinkUrl)) {
    console.log('✅ Detected: HRLINK (from VITE_HRLINK_URL)');
    return Panel.HRLINK;
  }

  // Default: HRLINK
  console.warn('⚠️ Could not detect domain, using default: HRLINK');
  return Panel.HRLINK;
}

export function getDomainTheme(): Panel {
  return getCurrentDomain();
}

export function getDomainConfig(panel?: Panel): DomainConfig {
  const currentPanel = panel || getCurrentDomain();
  return DOMAIN_CONFIGS[currentPanel];
}

export function applyFavicon(panel: Panel) {
  const config = getDomainConfig(panel);

  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.href = config.favicon;
  console.log('✅ Favicon applied:', config.favicon);
}

/**
 * اعمال Page Title
 */
export function applyPageTitle(panel: Panel, pageTitle?: string) {
  const config = getDomainConfig(panel);
  const title = pageTitle ? `${pageTitle} | ${config.title}` : config.title;

  document.title = title;
  console.log('✅ Page title applied:', title);
}

export function applyMetaTags(panel: Panel) {
  const config = getDomainConfig(panel);

  // Description
  let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = config.description;

  console.log('✅ Meta tags applied');
}

export function applyDomainTheme(panel: Panel, mode: 'light' | 'dark') {
  const config = getDomainConfig(panel);
  const theme = config.theme[mode];
  const root = document.documentElement;

  root.classList.remove('hrlink', 'hrbox', 'super-admin', 'light', 'dark');

  root.classList.add(panel, mode);
  root.style.colorScheme = mode;

  root.style.setProperty('--color-panel-primary', theme.primary);
  root.style.setProperty('--color-panel-secondary', theme.secondary);
  root.style.setProperty('--color-panel-background', theme.background);
  root.style.setProperty('--color-panel-surface', theme.surface);

  console.log(`✅ Theme applied: ${panel} (${mode})`);
}

export function getLoginBackground(panel: Panel, mode: 'light' | 'dark'): string {
  const config = getDomainConfig(panel);
  return config.loginBg[mode];
}


export function getPanelBackground(panel: Panel, mode: 'light' | 'dark'): string {
  const config = getDomainConfig(panel);
  return config.panelBg[mode];
}