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
    },
    resolve: {
      ...config.resolve,
    },
  };
});
