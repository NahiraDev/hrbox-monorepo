import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ root: '../..' })
  ],

  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../core'),
      '@module': path.resolve(__dirname, '../../modules'),
      '@configs': path.resolve(__dirname, '../../configs'),
      '@mock': path.resolve(__dirname, '../../mock')
    },
  },

  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'HRLinkModule',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM'
        }
      }
    }
  }
});
