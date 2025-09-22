import { defineConfig } from 'vite';
import { baseConfig } from '../../vite.config.base';

export default defineConfig((env) => {
  const config = baseConfig(env);

  return {
    ...config,
    base: '/chart-maker',
    root: 'modules/chart-maker',

    plugins: [
      ...(config.plugins || []),
    ],

    resolve: {
      ...config.resolve,
    }
  };
});
