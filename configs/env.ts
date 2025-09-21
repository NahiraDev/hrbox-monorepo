export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  APP_ENV: 'local' | 'development' | 'staging' | 'production' | 'test';

  APP_URL: string;
  API_BASE_URL: string;
  MOCK_API_URL?: string;
  CDN_URL?: string;

  HRLINK_PORT: number;
  HRLINK_BASE_PATH: string;

  FEATURES: {
    DARK_MODE: boolean;
    ANALYTICS: boolean;
    NOTIFICATIONS: boolean;
    OFFLINE_MODE: boolean;
    MOCK_ENABLED: boolean;
  };

  DEBUG_MODE: boolean;
  LOG_LEVEL: 'silent' | 'error' | 'warn' | 'info' | 'debug';

  AUTH_DOMAIN?: string;
  AUTH_CLIENT_ID?: string;

  SENTRY_DSN?: string;
  ANALYTICS_ID?: string;
  GOOGLE_MAPS_API_KEY?: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key] || process.env[key];
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || defaultValue || '';
}

function getBooleanEnvVar(key: string, defaultValue = false): boolean {
  const value = getEnvVar(key);
  return value === 'true' || value === '1';
}

function getNumberEnvVar(key: string, defaultValue: number): number {
  const value = getEnvVar(key);
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export const env: EnvironmentConfig = {
  NODE_ENV: (getEnvVar('NODE_ENV', 'development') as any),
  APP_ENV: (getEnvVar('APP_ENV', 'local') as any),

  APP_URL: getEnvVar('VITE_APP_URL', 'http://localhost:3000'),
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000/api'),
  MOCK_API_URL: getEnvVar('VITE_MOCK_API_URL'),
  CDN_URL: getEnvVar('VITE_CDN_URL'),

  HRLINK_PORT: getNumberEnvVar('VITE_HRLINK_PORT', 3001),
  HRLINK_BASE_PATH: getEnvVar('VITE_HRLINK_BASE_PATH', '/hrlink'),

  FEATURES: {
    DARK_MODE: getBooleanEnvVar('VITE_FEATURE_DARK_MODE', true),
    ANALYTICS: getBooleanEnvVar('VITE_FEATURE_ANALYTICS', false),
    NOTIFICATIONS: getBooleanEnvVar('VITE_FEATURE_NOTIFICATIONS', true),
    OFFLINE_MODE: getBooleanEnvVar('VITE_FEATURE_OFFLINE_MODE', false),
    MOCK_ENABLED: getBooleanEnvVar('VITE_MOCK_ENABLED', true),
  },

  DEBUG_MODE: getBooleanEnvVar('VITE_DEBUG_MODE', false),
  LOG_LEVEL: (getEnvVar('VITE_LOG_LEVEL', 'info') as any),

  AUTH_DOMAIN: getEnvVar('VITE_AUTH_DOMAIN'),
  AUTH_CLIENT_ID: getEnvVar('VITE_AUTH_CLIENT_ID'),

  SENTRY_DSN: getEnvVar('VITE_SENTRY_DSN'),
  ANALYTICS_ID: getEnvVar('VITE_ANALYTICS_ID'),
  GOOGLE_MAPS_API_KEY: getEnvVar('VITE_GOOGLE_MAPS_API_KEY'),
};

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

export const isLocal = env.APP_ENV === 'local';
export const isStaging = env.APP_ENV === 'staging';
