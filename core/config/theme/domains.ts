// ============================================
// core/config/theme/domains.ts (COMPLETE)
// ============================================

import { Panel } from './roles';


export type Domain = "front.hrbox.me" | 'react.hrbox.me' | 'super-admin'


export interface DomainConfig {
  domain: string;
  panel: Panel;
  hosts: string[];

  // Visual Assets
  logo: string;
  logoMobile: string;
  favicon: string;

  // Page Meta
  title: string;
  description: string;

  // Background Images
  loginBg: {
    light: string;
    dark: string;
  };

  // Theme Colors
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

  // Social/Meta
  ogImage?: string;
  twitterCard?: string;
}

// ============================================
// Domain Configurations
// ============================================

export const DOMAIN_CONFIGS: Record<Panel, DomainConfig> = {
  // HRLink Configuration
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
    logoMobile: '/images/hrlink/logo-mobile.svg',
    favicon: '/images/hrlink/favicon.ico',

    title: 'HRLink - استخدام و کاریابی',
    description: 'پلتفرم جامع استخدام و کاریابی',

    loginBg: {
      light: '/images/hrlink/login-bg-light.webp',
      dark: '/images/hrlink/login-bg-dark.webp',
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
    },

    ogImage: '/images/hrlink/og-image.jpg',
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
    logoMobile: '/images/hrbox/logo-mobile.svg',
    favicon: '/images/hrbox/favicon.ico',

    title: 'HRBox - مدیریت منابع انسانی',
    description: 'سیستم جامع مدیریت منابع انسانی',

    loginBg: {
      light: '/images/hrbox/login-bg-dark.webp',
      dark: '/images/hrbox/login-bg-dark.webp',
    },

    theme: {
      light: {
        primary: '#6366F1',
        secondary: '#1E293B',
        background: '#F8FAFC',
        surface: '#FFFFFF',
      },
      dark: {
        primary: '#818CF8',
        secondary: '#FFFFFF',
        background: '#0F172A',
        surface: '#1E293B',
      },
    },

    ogImage: '/images/hrbox/og-image.jpg',
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
  if (typeof window === 'undefined') {
    return Panel.HRBOX; // SSR fallback
  }

  const hostname = window.location.hostname;
  const port = window.location.port;
  const fullHost = port ? `${hostname}:${port}` : hostname;

  console.log('🔍 Detecting domain from:', fullHost);

  for (const [panel, config] of Object.entries(DOMAIN_CONFIGS)) {
    if (config.hosts.some(host => fullHost.includes(host) || hostname.includes(host))) {
      console.log('✅ Domain detected:', panel);
      return panel as Panel;
    }
  }

  console.warn('⚠️ Unknown domain, falling back to hrbox');
  return Panel.HRBOX;
}

/**
 * دریافت تنظیمات دامنه
 */
export function getDomainConfig(panel?: Panel): DomainConfig {
  const currentPanel = panel || getCurrentDomain();
  return DOMAIN_CONFIGS[currentPanel];
}

/**
 * اعمال Favicon
 */
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

/**
 * اعمال Meta Tags
 */
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

  // OG Tags
  if (config.ogImage) {
    let ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.content = config.ogImage;
  }

  console.log('✅ Meta tags applied');
}

/**
 * اعمال Theme به DOM
 */
export function applyDomainTheme(panel: Panel, mode: 'light' | 'dark') {
  const config = getDomainConfig(panel);
  const theme = config.theme[mode];
  const root = document.documentElement;

  // حذف کلاس‌های قبلی
  root.classList.remove('hrlink', 'hrbox', 'super-admin', 'light', 'dark');

  root.classList.add(panel, mode);
  root.style.colorScheme = mode;

  root.style.setProperty('--color-panel-primary', theme.primary);
  root.style.setProperty('--color-panel-secondary', theme.secondary);
  root.style.setProperty('--color-panel-background', theme.background);
  root.style.setProperty('--color-panel-surface', theme.surface);

  console.log(`✅ Theme applied: ${panel} (${mode})`);
}

/**
 * دریافت Login Background
 */
export function getLoginBackground(panel: Panel, mode: 'light' | 'dark'): string {
  const config = getDomainConfig(panel);
  return config.loginBg[mode];
}