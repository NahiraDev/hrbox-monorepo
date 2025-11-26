import { defineConfig } from 'vite';
import { baseConfig } from '../../vite.config.base';

export default defineConfig((env) => {
  const config = baseConfig(env);

  return {
    ...config,
    base: '/project-management',
    root: 'modules/process-maker',

    plugins: [
      ...(config.plugins || []),
    ],

    build: {
      outDir: 'dist',
      lib: {
        entry: 'app/main.ts',
        name: 'ProjectManagementModule',
        fileName: 'project-management',
        formats: ['es', 'cjs'],
      },
    },
    resolve: {
      ...config.resolve,
    }
  };
});
