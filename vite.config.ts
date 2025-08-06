import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-ignore
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  clearScreen: false,
  logLevel: 'info',
  build: {
    sourcemap: true,
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(process.env.HOME || '', '.vite-ssl/dev-key.pem')),
      cert: fs.readFileSync(path.resolve(process.env.HOME || '', '.vite-ssl/dev-cert.pem')),
    },
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
});
