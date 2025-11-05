import { type ConfigEnv, defineConfig, PluginOption, type UserConfig } from 'vite';
import path from 'path'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import imagemin from 'vite-plugin-imagemin';

// Core plugins
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Performance & Optimization
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import analyzer from 'vite-bundle-analyzer';

// Development Experience
import { ViteEjsPlugin } from 'vite-plugin-ejs';

// Build Optimization
import { comlink } from 'vite-plugin-comlink';
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
        /^\/sso(?:\/.*)?$/,
        /^\/process-maker(?:\/.*)?$/,
        /^\/chart-maker(?:\/.*)?$/,
        /^\/hrlink(?:\/.*)?$/,
        /^\/basic-info(?:\/.*)?$/,
      ];

      if (url !== '/') {
        const isModuleRoute = moduleRoutes.some(route => route.test(url));

        if (isModuleRoute) {
          return next();
        } else {
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

  // SSL Configuration
  let httpsConfig = undefined;
  try {
    const keyPath = resolve(__dirname, 'certs/cert_hrbox.key');
    const certPath = resolve(__dirname, 'certs/cert_hrbox.crt');

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      httpsConfig = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      console.log('✅ SSL certificates loaded successfully');
    } else {
      console.warn('⚠️  SSL certificate files not found. Running without HTTPS.');
    }
  } catch (error) {
    console.error('❌ Error loading SSL certificates:', error);
  }

  const plugins = [
    react() as PluginOption,
    tsconfigPaths() as PluginOption,
    ViteEjsPlugin({
      domain: envVars.VITE_APP_URL || 'localhost',
      buildTime: new Date().toISOString(),
      version: packageJson.version || '1.0.0',
    }) as PluginOption,
    tailwindcss() as PluginOption,
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
        input: {
          main: resolve(__dirname, 'index.html'),
          core: resolve(__dirname, 'core/index.ts'),
          sso: resolve(__dirname, 'modules/sso/app/register.ts'),
          processMaker: resolve(__dirname, 'modules/process-maker/app/register.ts'),
          chartMaker: resolve(__dirname, 'modules/chart-maker/app/register.ts'),
          hrlink: resolve(__dirname, 'modules/hrlink/app/register.ts'),
          basicInfo: resolve(__dirname, 'modules/basic-info/app/register.ts'),
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
        '@proxy-server': resolve(__dirname, 'proxy-server'),
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      conditions: isProduction ? ['production'] : ['development'],
      mainFields: ['browser', 'module', 'main'],
    },

    assetsInclude: ['**/*.html'],

    server: {
      port: 443,
      host: true,
      allowedHosts: ['localhost' , 'front.hrbox.me' , 'react.hrbox.me'],
      strictPort: true,
      open: false,
      cors: true,
      https: httpsConfig,
      hmr: {
        overlay: true,
        host: 'front.hrbox.me',
        protocol: 'wss',
        port: 443,
      },

      proxy: {
        '/api': {
          target: 'https://hrlink.hrbox.me:50443',
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy, options) => {
            proxy.on('error', (err, _req, _res) => {
              console.error('❌ Proxy error:', err.message);
            });

            proxy.on('proxyReq', (proxyReq, req, _res) => {
              proxyReq.setHeader('Host', 'https://hrlink.hrbox.me:50443');
              proxyReq.setHeader('Origin', 'https://react.hrbox.me');
            });

            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log(`📥 [hrlink.hrbox.me → Vite] ${proxyRes.statusCode} ${req.url}`);
            });
          },
        },

        // Proxy برای DesktopModules
        '/DesktopModules': {
          target: 'https://hrlink.hrbox.me:50443',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },

      watch: {
        usePolling: true,
        interval: parseInt(envVars.VITE_WATCH_INTERVAL || '100'),
      },
    },

    // Preview server
    preview: {
      port: 443,
      host: '0.0.0.0',
      strictPort: true,
      open: envVars.VITE_OPEN !== 'false',
      cors: true,
      https: httpsConfig,
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
