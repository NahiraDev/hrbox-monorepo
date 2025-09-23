import { defineConfig } from 'vite';
import { baseConfig } from '../../vite.config.base';

export default defineConfig((env) => {
  const config = baseConfig(env);

  return {
    ...config,
    base: '/sso',
    root: 'modules/process-maker',

    plugins: [
      ...(config.plugins || []),
    ],

    build: {
      outDir: 'dist',
      lib: {
        entry: 'app/main.ts',
        name: 'SSOrModule',
        fileName: 'sso',
        formats: ['es', 'cjs'],
      },
    },

    resolve: {
      ...config.resolve,
    }
  };
});
