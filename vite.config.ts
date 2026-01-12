import { type ConfigEnv, defineConfig, loadEnv, PluginOption, type UserConfig } from "vite";
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
  const mode: any = process.env.VITE_APP_ENV || env.mode;
  const isDevelopment = mode !== "production";
  const isProduction = mode === "production";
  const isTest = mode === "test";

  const envVars = loadEnv(mode, process.cwd(), "");
  let packageJson: any = {};
  try {
    packageJson = JSON.parse(
      readFileSync(resolve(__dirname, "package.json"), "utf-8")
    );
  } catch {
  }

  const plugins = [
    react() as PluginOption,
    tsconfigPaths() as PluginOption,
    tailwindcss() as PluginOption
  ];

  return {
    plugins,

    cacheDir: ".vite",

    define: {
      __DEV__: isDevelopment,
      __PROD__: isProduction,
      __TEST__: isTest,
      __VERSION__: JSON.stringify(packageJson.version || "1.0.0"),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __FEATURE_SSO__: true,
      __FEATURE_CHARTS__: true,
      __FEATURE_REPORTS__: true,
      "process.env.VITE_APP_ENV": JSON.stringify(mode)
    },

    css: {
      postcss: "./core/config/tailwind/postcss.config.js",
      devSourcemap: false
    },

    build: {
      target: "es2022",
      minify: isProduction ? "terser" : false,
      sourcemap: isDevelopment,
      emptyOutDir: true,
      cssCodeSplit: true,
      outDir: resolve(__dirname, "dist"),
      assetsDir: "public",
      chunkSizeWarningLimit: 1000,
      rollupOptions: isProduction
        ? {
          input: {
            main: resolve(__dirname, "main.tsx"),
            sso: path.resolve(__dirname, "./modules/sso/plugin.tsx"),
            processMaker: resolve(
              __dirname,
              "./modules/process-maker/plugin.tsx"
            ),
            chartMaker: resolve(__dirname, "modules/chart-maker/plugin.tsx"),
            hrlink: resolve(__dirname, "./modules/hrlink/plugin.tsx"),
            attendance: resolve(__dirname, "./modules/attendance/plugin.tsx"),
            jobGradings: resolve(
              __dirname,
              "./modules/job-gradings/plugin.tsx"
            ),
            basicInfo: resolve(__dirname, "./modules/basic-info/plugin.tsx"),
            projectManagement: resolve(
              __dirname,
              "./modules/project-management/plugin.tsx"
            ),
            messenger: resolve(__dirname, "./modules/messenger/plugin.tsx"),
            jobDescription: resolve(
              __dirname,
              "./modules/job-description/plugin.tsx"
            )
          },
          output: {
            chunkFileNames: "[name]-[hash].js",
            assetFileNames: "assets/[name]-[ext]",
            manualChunks(id) {
              if (id.includes("node_modules")) {
                if (id.includes("react") || id.includes("react-dom")) {
                  return "react-vendor";
                }
                if (id.includes("@heroui") || id.includes("@emotion")) {
                  return "ui-vendor";
                }
                if (id.includes("@tanstack")) {
                  return "query-vendor";
                }
                if (id.includes("redux")) {
                  return "redux-vendor";
                }
                return "vendor";
              }
            }
          }
        }
        : {
          input: resolve(__dirname, "main.tsx")
        }
    },

    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
      charset: "utf8",
      logOverride: {
        "this-is-undefined-in-esm": "silent"
      }
    },

    root: resolve(__dirname, "."),
    base: "./",

    resolve: {
      alias: {
        "@hrbox/core": resolve(__dirname, "core"),
        "@hrbox/modules": resolve(__dirname, "modules"),
        "@hrbox/routes": resolve(__dirname, "routes"),
        "@hrbox/uikit": resolve(__dirname, "UIKit"),

        react: resolve(__dirname, "node_modules/react"),
        "react-dom": resolve(__dirname, "node_modules/react-dom")
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
      conditions: isProduction ? ["production"] : ["development"],
      mainFields: ["browser", "module", "main"],
      dedupe: ["react", "react-dom", "react/jsx-runtime"]
    },

    assetsInclude: ["**/*.html"],

    server: {
      port: 443,
      host: "0.0.0.0",
      allowedHosts: ["localhost", "front.hrbox.me", "react.hrbox.me"],
      strictPort: false,
      open: false,
      cors: true,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, "certs/cert_hrbox.key")),
        cert: fs.readFileSync(path.resolve(__dirname, "certs/cert_hrbox.crt"))
      },
      hmr: {
        overlay: true,
        clientPort: 443
      },

      proxy: {
        "/api": {
          target: "https://hrlink.hrbox.me:50443",
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy: any) => {
            proxy.on("error", () => {
            });
            proxy.on("proxyReq", (proxyReq: any) => {
              proxyReq.setHeader("Host", "https://hrlink.hrbox.me:50443");
              proxyReq.setHeader("Origin", "https://front.hrbox.me");
            });
          }
        },
        "/DesktopModules": {
          target: "https://hrlink.hrbox.me:50443",
          changeOrigin: true,
          secure: false,
          ws: true
        }
      },

      watch: {
        usePolling: false,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/dist/**",
          "**/.vite/**",
          "**/coverage/**",
          "**/*.log"
        ]
      }
    },

    preview: {
      port: 443,
      host: "0.0.0.0",
      allowedHosts: ["localhost", "front.hrbox.me", "react.hrbox.me"],
      strictPort: true,
      open: envVars.VITE_OPEN !== "false",
      cors: true,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, "certs/cert_hrbox.key")),
        cert: fs.readFileSync(path.resolve(__dirname, "certs/cert_hrbox.crt"))
      }
    },

    appType: "spa",

    optimizeDeps: {
      entries: ["main.tsx"],
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "@tanstack/react-query",
        "react-redux",
        "@reduxjs/toolkit",
        "@reduxjs/toolkit/query",
        "@reduxjs/toolkit/query/react",
        "redux-persist",
        "redux-persist/integration/react",
        "react-i18next",
        "i18next",
        "i18next-browser-languagedetector",
        "formik",
        "clsx",
        "framer-motion",
        "sonner"
      ],
      force: true
    },

    worker: {
      format: "es"
    },

    logLevel: "info"
  };
});
