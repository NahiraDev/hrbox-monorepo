import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

export const baseConfig = defineConfig((_env: any) => {
  return {
    plugins: [react(), tsconfigPaths(), tailwindcss(), imagetools()],
    server: {
      https: {
        key: fs.readFileSync(path.resolve('C:/Users/Moho/localhost+2-key.pem')),
        cert: fs.readFileSync(path.resolve('C:/Users/Moho/localhost+2.pem')),
      },
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
    },
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@core': path.resolve(__dirname, 'core'),
        '@module': path.resolve(__dirname, 'modules'),
        '@configs': path.resolve(__dirname, 'configs'),
        '@mock': path.resolve(__dirname, 'mock'),
      },
    },
  };
});
