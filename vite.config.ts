import { type ConfigEnv, defineConfig, PluginOption, type UserConfig } from 'vite';
import path from 'path'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import imagemin from 'vite-plugin-imagemin';
// Core plugins
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// Performance & Optimization
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import analyzer from 'vite-bundle-analyzer';

// Development Experience
import { checker } from 'vite-plugin-checker';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';

// Build Optimization
import { comlink } from 'vite-plugin-comlink';
// import { federation } from '@module-federation/vite';
// import { viteStaticCopy } from 'vite-plugin-static-copy';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// Styling
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';
// Utilities
import { loadEnv } from 'vite';
import { OutputOptions } from 'rollup';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import * as fs from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Advanced middleware for SPA routing
const createAdvancedSpaMiddleware = () => ({
  name: 'advanced-spa-middleware',
  configureServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      if (req.method !== 'GET') return next();

      const url = req.url;

      const staticPatterns = [
        /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt|wasm)$/,
        /^\/public\//,
        /^\/static\//,
        /^\/@/,
        /^\/node_modules/,
        /^\/\$vite/,
        /^\/__/,
        /^\/favicon/,
        /^\/manifest/,
        /^\/sw\.js/,
        /^\/workbox/,
      ];

      // API patterns
      const apiPatterns = [/^\/api\//, /^\/DesktopModules\//, /^\/graphql/, /^\/trpc/];

      // Don't intercept static files or API calls
      if (
        staticPatterns.some(pattern => pattern.test(url)) ||
        apiPatterns.some(pattern => pattern.test(url))
      ) {
        return next();
      }

      // Module routing - let specific modules handle their own routing
      const moduleRoutes = [
        // SSO module - supports: /sso, /sso/login, /sso/callback, /sso/settings/advanced, etc.
        /^\/sso(?:\/.*)?$/,

        // Process Maker - supports: /process-maker, /process-maker/create, /process-maker/workflows/123, etc.
        /^\/process-maker(?:\/.*)?$/,

        // Chart Maker - supports: /chart-maker, /chart-maker/dashboard, /chart-maker/reports/monthly, etc.
        /^\/chart-maker(?:\/.*)?$/,

        // HR Link - supports: /hrlink, /hrlink/employees, /hrlink/employees/123/details, etc.
        /^\/hrlink(?:\/.*)?$/,

        // Basic Info - supports: /basic-info, /basic-info/profile, /basic-info/settings/personal, etc.
        /^\/basic-info(?:\/.*)?$/,
      ];

      if (url !== '/') {
        const isModuleRoute = moduleRoutes.some(route => route.test(url));

        if (isModuleRoute) {
          // Let the module handle its own routing
          return next();
        } else {
          // For unmatched routes, redirect to index.html for SPA routing
          req.url = 'index.html';
        }
      }

      next();
    });
  },
});

export default defineConfig(async (env: ConfigEnv): Promise<UserConfig> => {
  const mode = process.env.VITE_APP_ENV;
  const isDevelopment = mode;
  const isProduction = mode;
  const isTest = mode === 'test';

  // Load environment variables
  const envVars = loadEnv(mode, process.cwd(), '');

  // Package.json analysis for smart optimizations
  let packageJson: any = {};
  try {
    packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
  } catch {}

  const plugins = [
    // TypeScript checking with performance optimization
    // checker({
    //   typescript: {
    //     tsconfigPath: './tsconfig.json',
    //     buildMode: isProduction,
    //   },
    // eslint: {
    //   lintCommand: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
    //   dev: { logLevel: ['warning'] },
    // },
    // }) as PluginOption,

    // React with SWC - fastest React refresh
    react({
    jsxImportSource: '@emotion/react',
    reactRefreshHost: 'http://localhost:5173',
      plugins: [['@swc/plugin-styled-components', {}]]
    }) as PluginOption,

    // Advanced TypeScript path resolution
    // tsconfigPaths({
    //   loose: true, // Better performance
    //   projects: ['./tsconfig.json'],
    // }) as PluginOption,
    tsconfigPaths() as PluginOption,

    ViteEjsPlugin({
      domain: envVars.VITE_APP_URL || 'localhost',
      buildTime: new Date().toISOString(),
      version: packageJson.version || '1.0.0',
    }) as PluginOption,

    // createAdvancedSpaMiddleware() as PluginOption,

    // Development mocking
    ...(isDevelopment
      ? [
          mockDevServerPlugin({
            prefix: '/api',
            wsPrefix: '/socket.io',
          }) as PluginOption,
        ]
      : []),

    // Web Workers support
    ...(isProduction ? [comlink() as PluginOption] : []),

    tailwindcss() as PluginOption,

    ...(isProduction ? [analyzer() as PluginOption] : []),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: envVars.VITE_APP_TITLE || 'HRBox Enterprise',
          description: envVars.VITE_APP_DESCRIPTION || 'Next-generation HR management system',
          keywords: 'HR, Enterprise, Management, Monorepo',
          author: 'HRBox Team',
        },
      },
      template: 'index.html',
    }) as PluginOption,
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.65, 0.8], speed: 4 },
      webp: { quality: 85 },
    }) as PluginOption,
    // Micro-frontend support with Module Federation
    ...(isProduction
      ? [
          federation({
            name: 'hrbox',
            filename: 'remoteEntry.js',
            manifest: true,
            exposes: {
              './main': './main.tsx',
            },
            remotes: {
              remote: {
                type: 'module',
                name: 'remote',
                entry: 'https://localhost:5000/remoteEntry.js',
                entryGlobalName: 'remote',
                shareScope: 'default',
              },
              var_remote: 'var_remote@https://localhost:5000/remoteEntry.js',
            },
            shared: {
              react: {
                singleton: true,
              },
              'react/': {
                singleton: true,
              },
            },
          }),
        ]
      : []),

    // Static asset copying with optimization
    ...(isProduction
      ? [
          viteStaticCopy({
            targets: [
              {
                src: 'public/robots.txt',
                dest: '.',
              },
              {
                src: 'public/sitemap.xml',
                dest: '.',
              },
              {
                src: 'public/images/**/*',
                dest: 'core-assets',
              },
            ],
          }) as PluginOption,
        ]
      : []),

    // Advanced PWA with workbox strategies
    // ...(isProduction ? [
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.js',
      strategies: 'generateSW',
      includeAssets: [
        '**/*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf}',
        '**/*.html',
        '**/*.css',
        '**/*.js',
      ],
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,webp,svg,woff,woff2,ttf}'],
        globIgnores: ['**/node_modules/**/*'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\..*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 1000, maxAgeSeconds: 60 * 5 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/DesktopModules\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'desktop-modules-cache',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'HRBox Enterprise Suite',
        short_name: 'HRBox',
        description: 'Advanced HR management platform with micro-frontend architecture',
        theme_color: '#1f2937',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        categories: ['business', 'productivity'],
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/wide.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
    }) as PluginOption,
    // ] : []),

    // HTML minification
    ViteMinifyPlugin({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    }) as PluginOption,

    // Bundle analysis
    ...(envVars.ANALYZE === 'true'
      ? [
          visualizer({
            filename: 'dist/bundle-analysis.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
            template: 'treemap',
          }) as PluginOption,
        ]
      : []),
  ];

  return {
    plugins,

    // Define global constants
    define: {
      __DEV__: isDevelopment,
      __PROD__: isProduction,
      __TEST__: isTest,
      __VERSION__: JSON.stringify(packageJson.version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      // Global feature flags
      __FEATURE_SSO__: true,
      __FEATURE_CHARTS__: true,
      __FEATURE_REPORTS__: true,
      'process.env.VITE_APP_ENV': JSON.stringify(mode),
    },

    // Build configuration
    build: {
      target: 'es2023',
      minify: 'terser',
      sourcemap: false,
      emptyOutDir: true,
      cssCodeSplit: true,
      outDir: resolve(__dirname, 'dist'),
      assetsDir: '',
      rollupOptions: {
        external: (id: string) =>
          /\.(png|jpg|jpeg|gif|webp|svg|ico|css|eot|woff|woff2|ttf|css\.map)$/i.test(id) ||
          /node_modules/.test(id),
        input: {
          main: resolve(__dirname, 'index.html'),
          core: resolve(__dirname, 'core/index.ts'),
          sso: resolve(__dirname, 'modules/sso/app/register.ts'),
          processMaker: resolve(__dirname, 'modules/process-maker/app/register.ts'),
          chartMaker: resolve(__dirname, 'modules/chart-maker/app/register.ts'),
          hrlink: resolve(__dirname, 'modules/hrlink/app/register.ts'),
          basicInfo: resolve(__dirname, 'modules/basic-info/app/register.ts'),
        },
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          unknownGlobalSideEffects: false,
        },
        output: {
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'main') return 'index.js';
            if (chunkInfo.name === 'core') return 'core/index.js';
            if (chunkInfo.name === 'sso') return 'modules/sso/index.js';
            if (chunkInfo.name === 'processMaker') return 'modules/process-maker/index.js';
            if (chunkInfo.name === 'chartMaker') return 'modules/chart-maker/index.js';
            if (chunkInfo.name === 'hrlink') return 'modules/hrlink/index.js';
            if (chunkInfo.name === 'basicInfo') return 'modules/basic-info/index.js';
            return '[name].js';
          },
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: 'assets/[name]-[ext]',
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug', 'console.warn', 'console.log'],
          unsafe: true,
          passes: 4,
        },
        mangle: {
          properties: { regex: /^_/ },
          toplevel: true,
        },
        format: { comments: false },
      },
      chunkSizeWarningLimit: 1000,
    },
    // ESBuild configuration
    esbuild: {
      jsxInject: `import React from 'react'`,
      drop: isProduction ? ['console', 'debugger'] : [],
      legalComments: 'none',
      charset: 'utf8',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      treeShaking: true,
    },
    root: resolve(__dirname, '.'),
    base: '/',
    resolve: {
      alias: {
        '@root': resolve(__dirname, '.'),
        '@core': resolve(__dirname, 'core'),
        '@module': resolve(__dirname, 'modules'),
      },

      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],

      conditions: isProduction ? ['production'] : ['development'],

      mainFields: ['browser', 'module', 'main'],
    },
    assetsInclude: ['**/*.html'],

    // Development server
    // server: {
    //   port: parseInt(envVars.VITE_PORT || '5173'),
    //   host: '0.0.0.0',
    //   strictPort: false,
    //   open: true,
    //   cors: true,
    //   https: {
    //     key: fs.readFileSync(path.resolve(__dirname ,'certs/front.hrbox.me+2-key.pem')),
    //     cert: fs.readFileSync(path.resolve(__dirname, 'certs/front.hrbox.me+2.pem')),
    //   },
    //   hmr: true,
    //   // {
    //   //   overlay: false,
    //   //   clientPort: 443,
    //   //   port: 5174,
    //   //   protocol: 'wss',
    //   //   host: 'front.hrbox.me',
    //   // },

    //   watch: {
    //     usePolling: true,
    //     interval: parseInt(envVars.VITE_WATCH_INTERVAL || '100'),
    //   },
    // },

    server: {
      port: parseInt(envVars.VITE_PORT || '5173'),
      host: 'front.hrbox.me',
      strictPort: false,
      open: true,
      cors: true,
      allowedHosts: ['front.hrbox.me'],
      https: {
        key: fs.readFileSync(path.resolve(__dirname, '.cert/front.hrbox.me+1-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '.cert/front.hrbox.me+1.pem')),
      },
      hmr:
      {
        overlay: true,
        port: 5173,
        protocol: 'wss',
        host: 'front.hrbox.me',
      },
 
      // Add proxy configuration
      proxy: {
      '/api': {
        target: 'https://hrlink.hrbox.me/',
        changeOrigin: true,
        secure: true, // allow self-signed certs if backend uses https
        rewrite: path => path.replace(/^\/api/, ''), // remove "/api" prefix
      },
    },
    
      watch: {
        usePolling: true,
        interval: parseInt(envVars.VITE_WATCH_INTERVAL || '100'),
      },
    },

    // Preview server
    preview: {
      port: parseInt(envVars.VITE_PREVIEW_PORT || '4173'),
      host: '0.0.0.0',
      strictPort: false,
      open: envVars.VITE_OPEN !== 'false',
      cors: true,
    },
    appType: 'spa',
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@emotion/react', '@emotion/styled'],
      exclude: ['@vite/client', '@vite/env'],
    },

    // Worker configuration
    worker: {
      format: 'es',
      plugins: () => [react()],
      rollupOptions: {
        output: {
          entryFileNames: 'assets/workers/[name]-[hash].js',
        },
      },
    },
  };
});
