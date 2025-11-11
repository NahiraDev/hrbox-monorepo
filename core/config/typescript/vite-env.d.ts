/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_HRLINK_URL: string;
  readonly VITE_HRBOX_URL: string;
  readonly VITE_ENABLED_MODULES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}