import { defineConfig, mergeConfig } from 'vitest/config';
import { baseConfig } from './vite.config.base';

export default mergeConfig(
  baseConfig({ mode: 'test', command: 'build' }),
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts']
    }
  })
);
