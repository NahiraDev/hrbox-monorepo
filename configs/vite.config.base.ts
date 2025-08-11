import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export const baseConfig = defineConfig((_env) => {
  return {
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(process.env.HOME || '', '.vite-ssl/dev-key.pem')),
        cert: fs.readFileSync(path.resolve(process.env.HOME || '', '.vite-ssl/dev-cert.pem')),
      },
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@package': path.resolve(__dirname, '../packages'),
        '@module': path.resolve(__dirname, '../modules'),
        '@configs': path.resolve(process.cwd(), 'configs'),
        '@assets': path.resolve(__dirname, '../packages/app-assets'),
      },
    },
  };
});
