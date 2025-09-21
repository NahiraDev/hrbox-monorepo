import { type ConfigEnv, defineConfig } from 'vite';

import { baseConfig } from './configs/vite.config.base';
import path from "path";

export default defineConfig((env: ConfigEnv) => {
  const config = baseConfig(env);

  return {
    ...config,
    resolve: {
      alias: {
        '@core': path.resolve(__dirname, 'core'),
        '@module': path.resolve(__dirname, 'modules'),
        '@configs': path.resolve(__dirname, 'configs'),
        '@mock': path.resolve(__dirname, 'mock'),
      },
    },
  };
});
