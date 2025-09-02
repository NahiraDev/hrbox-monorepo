import path from 'path';

import { defineConfig } from 'vite';

import { baseConfig } from '../../configs/vite.config.base';

export default defineConfig((env) => {
  const config = baseConfig(env);

  return {
    ...config,
    base: '/chart-maker',
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'app/index.ts'),
        name: 'ChartMakerModule',
        formats: ['es'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  };
});
