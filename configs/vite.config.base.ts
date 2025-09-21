import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

export const baseConfig = defineConfig((_env: any) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      imagetools()
    ],
    server: {
      https: {
        key: fs.readFileSync(
          path.resolve(process.env.HOME || '', './localhost+2-key.pem'),
        ),
        cert: fs.readFileSync(
          path.resolve(process.env.HOME || '', './localhost+2.pem'),
        ),
      },
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
    define: {
      'process.env': {}
    },
  };
});

export default baseConfig;
