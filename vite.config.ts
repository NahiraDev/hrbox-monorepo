import {
  type ConfigEnv,
  defineConfig,
  loadEnv,
  PluginOption,
  type UserConfig,
} from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import * as fs from "node:fs";
import path from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(async (env: ConfigEnv): Promise<UserConfig> => {
  const mode: any = process.env.VITE_APP_ENV;
  const isDevelopment = mode;
  const isProduction = mode;
  const isTest = mode === "test";

  const envVars = loadEnv(mode, process.cwd(), "");

  let packageJson: any = {};
  try {
    packageJson = JSON.parse(
      readFileSync(resolve(__dirname, "package.json"), "utf-8"),
    );
  } catch {}

  // SSL Configuration
  let httpsConfig = undefined;
  try {
    const keyPath = resolve(__dirname, "./certs/cert_hrbox.key");
    const certPath = resolve(__dirname, "./certs/cert_hrbox.crt");
    const caPath = resolve(__dirname, "./certs/cert_hrbox_ca.crt");

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      httpsConfig = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
        ca: fs.readFileSync(caPath),
      };
    }
  } catch (error) {
    console.error("❌ Error loading SSL certificates:", error);
  }

  const plugins = [
    react() as PluginOption,
    tsconfigPaths() as PluginOption,
    tailwindcss() as PluginOption,
  ];

  return {
    plugins,
    define: {
      __DEV__: isDevelopment,
      __PROD__: isProduction,
      __TEST__: isTest,
      __VERSION__: JSON.stringify(packageJson.version || "1.0.0"),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __FEATURE_SSO__: true,
      __FEATURE_CHARTS__: true,
      __FEATURE_REPORTS__: true,
      "process.env.VITE_APP_ENV": JSON.stringify(mode),
    },
    css: {
      postcss: "./core/config/tailwind/postcss.config.js",
    },
    // Build configuration
    build: {
      target: "es2023",
      minify: "terser",
      sourcemap: false,
      emptyOutDir: true,
      cssCodeSplit: true,
      outDir: resolve(__dirname, "dist"),
      assetsDir: "public",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "main.tsx"),
          sso: path.resolve(__dirname, "./modules/sso/plugin.tsx"),
          processMaker: resolve(
            __dirname,
            "./modules/process-maker/plugin.tsx",
          ),
          chartMaker: resolve(__dirname, "modules/chart-maker/plugin.tsx"),
          hrlink: resolve(__dirname, "./modules/hrlink/plugin.tsx"),
          attendance: resolve(__dirname, "./modules/attendance/plugin.tsx"),
          jobGradings: resolve(__dirname, "./modules/job-gradings/plugin.tsx"),
          basicInfo: resolve(__dirname, "./modules/basic-info/plugin.tsx"),
          projectManagement: resolve(
            __dirname,
            "./modules/project-management/plugin.tsx",
          ),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === "main") return "index.js";
            if (chunkInfo.name === "core") return "core/index.js";
            if (chunkInfo.name === "sso") return "modules/sso/index.js";
            if (chunkInfo.name === "processMaker")
              return "modules/process-maker/index.js";
            if (chunkInfo.name === "chartMaker")
              return "modules/chart-maker/index.js";
            if (chunkInfo.name === "hrlink") return "modules/hrlink/index.js";
            if (chunkInfo.name === "basicInfo")
              return "modules/basic-info/index.js";
            if (chunkInfo.name === "attendance")
              return "modules/attendance/index.js";
            if (chunkInfo.name === "projectManagement")
              return "modules/project-management/index.js";
            if (chunkInfo.name === "jobGradings")
              return "modules/job-gradings/index.js";
            return "[name].js";
          },
          chunkFileNames: "[name]-[hash].js",
          assetFileNames: "assets/[name]-[ext]",
        },
      },
    },

    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
      charset: "utf8",
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      treeShaking: true,
    },

    root: resolve(__dirname, "."),
    base: "/",

    resolve: {
      alias: {
        "@hrbox/core": resolve(__dirname, "core"),
        "@hrbox/modules": resolve(__dirname, "modules"),
        "@hrbox/routes": resolve(__dirname, "routes"),
        "@hrbox/uikit": resolve(__dirname, "UIKit"),
        "@proxy-server": resolve(__dirname, "proxy-server"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
      conditions: isProduction ? ["production"] : ["development"],
      mainFields: ["browser", "module", "main"],
    },

    assetsInclude: ["**/*.html"],

    server: {
      port: 443,
      host: true,
      allowedHosts: ["localhost", "front.hrbox.me", "react.hrbox.me"],
      strictPort: false,
      open: false,
      cors: true,
      https: httpsConfig,
      hmr: {
        overlay: true,
        protocol: "wss",
        port: 443,
      },

      proxy: {
        "/api": {
          target: "https://hrlink.hrbox.me:50443",
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy, options) => {
            proxy.on("error", (err, _req, _res) => {
              console.error("❌ Proxy error:", err.message);
            });

            proxy.on("proxyReq", (proxyReq, req, _res) => {
              proxyReq.setHeader("Host", "https://hrlink.hrbox.me:50443");
              proxyReq.setHeader("Origin", "https://front.hrbox.me");
            });

            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                `📥 [hrlink.hrbox.me → Vite] ${proxyRes.statusCode} ${req.url}`,
              );
            });
          },
        },

        // Proxy برای DesktopModules
        "/DesktopModules": {
          target: "https://hrlink.hrbox.me:50443",
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy, options) => {
            proxy.on("error", (err, _req, _res) => {
              console.error("❌ Proxy error (DesktopModules):", err.message);
            });

            proxy.on("proxyReq", (proxyReq, req, _res) => {
              // ✅ تصحیح Host header: بدون protocol
              proxyReq.setHeader("Host", "hrlink.hrbox.me:50443");
              // ✅ تغییر Origin به front.hrbox.me برای شناسایی به عنوان front.hrbox.me
              proxyReq.setHeader("Origin", "https://front.hrbox.me");
            });

            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                `📥 [hrlink.hrbox.me → Vite (DesktopModules)] ${proxyRes.statusCode} ${req.url}`,
              );
            });
          },
        },
      },

      watch: {
        usePolling: true,
        interval: parseInt(envVars.VITE_WATCH_INTERVAL || "100"),
      },
    },

    // Preview server
    preview: {
      port: 443,
      host: "0.0.0.0",
      allowedHosts: ["localhost",  , "react.hrbox.me"],
      strictPort: true,
      open: envVars.VITE_OPEN !== "false",
      cors: true,
      https: httpsConfig,
    },

    appType: "spa",

    optimizeDeps: {
      include: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
      exclude: ["@vite/client", "@vite/env"],
    },

    // Worker configuration
    worker: {
      format: "es",
      plugins: () => [react()],
      rollupOptions: {
        output: {
          entryFileNames: "assets/workers/[name]-[hash].js",
        },
      },
    },
  };
});
