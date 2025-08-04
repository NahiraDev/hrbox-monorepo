import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';
import  * as autoprefixer from 'autoprefixer';
import {tailwindConfig} from '@hrbox/shared-styles/tailwind.config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(tailwindConfig),
        autoprefixer()
      ]
    }
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
