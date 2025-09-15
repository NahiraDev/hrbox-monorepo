import { type ConfigEnv, defineConfig } from 'vite';
import { baseConfig } from '@configs/vite.config.base.ts';

export default defineConfig((env: ConfigEnv) => {
  const config = baseConfig(env);

  return {
    base: '/project-management',
    ...config,
  };
});
