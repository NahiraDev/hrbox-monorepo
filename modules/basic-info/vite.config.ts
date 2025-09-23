import { defineConfig } from 'vite';
import { baseConfig } from '../../vite.config.base';

export default defineConfig((env) => {
  const config = baseConfig(env);

  return {
    ...config,
    base: '/basic-info',
    root: 'modules/basic-info',

    plugins: [
      ...(config.plugins || []),
    ],
    build: {
      outDir: 'dist',
      lib: {
        entry: 'app/main.ts',
        name: 'BasicInfoModule',
        fileName: 'basic-info',
        formats: ['es', 'cjs'],
      },
    },
    resolve: {
      ...config.resolve,
    },
  };
});
