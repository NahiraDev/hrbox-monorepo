import { defineConfig } from 'vite';
import { baseConfig } from '../../vite.config.base';

export default defineConfig((env) => {
  const config = baseConfig(env);

  return {
    ...config,
    base: '/project-management',

    plugins: [
      ...(config.plugins || []),
    ],

    resolve: {
      ...config.resolve,
    }
  };
});
