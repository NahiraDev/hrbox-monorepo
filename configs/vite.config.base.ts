import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
export const baseConfig = defineConfig((_env: any) => {
  return {
    plugins: [react(), tsconfigPaths(), tailwindcss(), imagetools()],
  };
});
export default baseConfig;
