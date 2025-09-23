import { type ConfigEnv, defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

const spaFallback = () => ({
  name: 'spa-fallback',
  configureServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      if (req.method === 'GET' && !req.url.includes('.') && !req.url.startsWith('/api')) {
        req.url = '/index.html';
      }
      next();
    });
  }
});

export const baseConfig = (env: ConfigEnv): UserConfig => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

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
        projects: ['./tsconfig.json', './core/tsconfig.json' , './modules/hrlink/tsconfig.json' , './modules/sso/tsconfig.json' , './modules/process-maker/tsconfig.json' , './modules/chart-maker/tsconfig.json' , './modules/basic-info/tsconfig.json' , './luncher/tsconfig.json'],
        ignoreConfigErrors: true
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
      }),
      spaFallback()
    ],

    root: './',
    base: '/',
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
      open: true,
      cors: true,
      hmr: {
        overlay: false,
        port: 5273
      },
      proxy: {
        '/DesktopModules/Freelancer/api': 'http://localhost:3000'
      },
      fs: {
        allow: [
          process.cwd(),
          'core',
          'modules/hrlink',
          'modules//sso',
          'modules//basic-info',
          'modules//process-maker',
          'modules//chart-maker'
        ]
      }
    },

    appType: 'spa',
    assetsInclude: ['**/*.html'],

    build: {
      target: 'es2020',
      minify: 'terser',
      sourcemap: isDev,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
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
        '@core',
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
      legalComments: 'none'
    },

    worker: {
      format: 'es'
    },

    preview: {
      port: 4173,
      host: '0.0.0.0',
      open: true
    }
  };
}

export default defineConfig(baseConfig);
