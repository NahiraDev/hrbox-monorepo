import { defineConfig } from 'vite';
import { baseConfig } from '../../vite.config.base';

export default defineConfig((env) => {
  const config = baseConfig(env);

  return {
    ...config,
    base: '/hrlink',
    root: 'modules/hrlink',

    plugins: [
      ...(config.plugins || []),
    ],
    build: {
      outDir: 'dist',
      lib: {
        entry: 'app/main.ts',
        name: 'HRLinkModule',
        fileName: 'hrlink',
        formats: ['es', 'cjs'],
      },
    },
    resolve: {
      ...config.resolve,
    }
  };
});
