/// <reference types="@vitest/browser/providers/playwright" />
/// <reference types="vitest/globals" />
/// <reference types="vite/client" />

declare global {
  const describe: typeof import('vitest').describe;
  const it: typeof import('vitest').it;
  const expect: typeof import('vitest').expect;
  const beforeAll: typeof import('vitest').beforeAll;
  const afterAll: typeof import('vitest').afterAll;
  const beforeEach: typeof import('vitest').beforeEach;
  const afterEach: typeof import('vitest').afterEach;
  const vi: typeof import('vitest').vi;

  // Environment variables
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_MOCK_ENABLED: boolean;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  // Browser testing APIs
  interface Window {
    // Custom properties if needed
  }
}

export {};
