import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { baseConfig } from '../../configs/vite.config.base';

export default defineConfig((env) => {
  const config = typeof baseConfig === 'function' ? baseConfig(env) : baseConfig;

  return {
    ...config,
    base: '/hrlink',
    root: __dirname,

    plugins: [
      react(),
      tsconfigPaths({
        root: '../..',
      }),
      ...(config.plugins || []),
    ],

    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@core': path.resolve(__dirname, '../../core'),
        '@module': path.resolve(__dirname, '../../modules'),
        '@configs': path.resolve(__dirname, '../../configs'),
        '@mock': path.resolve(__dirname, '../../mock'),
        '@': path.resolve(__dirname, './'),
      },
    },

    server: {
      port: 3001,
      host: '0.0.0.0',
      open: true,
      cors: true,
    },

    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'app/main.tsx'),
        name: 'HRLinkModule',
        formats: ['es'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', '@hrbox/core'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@hrbox/core': 'HRBoxCore',
          },
        },
      },
    },
  };
});
