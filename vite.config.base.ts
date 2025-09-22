import { type ConfigEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

export const baseConfig = defineConfig((_env: ConfigEnv) => {
  const isDev = _env.mode === 'development';
  const isProd = _env.mode === 'production';

  return {
    plugins: [
      react({
        babel: {
          plugins: isProd ? [
            ['@babel/plugin-transform-react-constant-elements'],
            ['@babel/plugin-transform-react-inline-elements']
          ] : []
        }
      }),
      tsconfigPaths({
        projects: ['./tsconfig.json', './core/tsconfig.json', './modules/*/tsconfig.json']
      }),
      tailwindcss(),
      imagetools({
        defaultDirectives: (url) => {
          if (url.searchParams.has('optimize')) {
            return new URLSearchParams({
              format: 'webp',
              quality: '80'
            });
          }
          return new URLSearchParams();
        }
      })
    ],

    resolve: {
      alias: {
        '@core': path.resolve(__dirname, 'core'),
        '@module': path.resolve(__dirname, 'modules'),
        '@configs': path.resolve(__dirname, 'configs'),
        '@mock': path.resolve(__dirname, 'mock'),
      },
      dedupe: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux']
    },

    server: {
      port: 5173,
      host: '0.0.0.0',
      open: '/sso/index.html',
      cors: true,
      hmr: { overlay: false },
      fs: {
        allow: [
          './modules',
          './core'
        ]
      }
    },

    build: {
      target: 'es2020',
      minify: 'terser',
      sourcemap: isDev,
      rollupOptions: {
        input: {
          sso: path.resolve(__dirname, './modules/sso/index.html'),
          hrlink: path.resolve(__dirname, './modules/hrlink/index.html'),
          basicInfo: path.resolve(__dirname, './modules/basic-info/index.html'),
          chartMaker: path.resolve(__dirname, './modules/chart-maker/index.html'),
          processMaker: path.resolve(__dirname, './modules/process-maker/index.html'),
          projectManagement: path.resolve(__dirname, './modules/project-management/index.html'),
        },
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
            'ui-vendor': ['@heroui/react', 'framer-motion'],
            'chart-vendor': ['chart.js', 'react-chartjs-2', 'apexcharts', 'react-apexcharts'],
            'date-vendor': ['date-fns', 'react-multi-date-picker', 'moment-jalaali'],
            'router-vendor': ['react-router-dom'],
            'form-vendor': ['formik', 'yup'],
            'utils-vendor': ['clsx', 'qs', 'lottie-react']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd
        }
      }
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@reduxjs/toolkit',
        'react-redux',
        'react-router-dom',
        'formik',
        'yup',
        'clsx',
        'date-fns'
      ],
      exclude: [
        '@hrbox/core',
        'bpmn-js/lib/Modeler'
      ]
    },

    define: {
      'process.env': {},
      __DEV__: isDev,
      __PROD__: isProd
    },

    css: {
      devSourcemap: isDev,
    },

    esbuild: {
      drop: isProd ? ['console', 'debugger'] : [],
      legalComments: 'none' as const
    },

    worker: {
      format: 'es'
    }
  };
});

export default baseConfig;
