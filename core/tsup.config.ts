import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm'],
  sourcemap: true,
  clean: true,
  splitting: false,
  dts: false,
  target: 'es2023',
  outDir: 'dist',
  minify: true,
  injectStyle: false,
  tsconfig: './tsconfig.json',
  bundle: true,
  external: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.webp',
    '**/*.svg',
    '**/*.ico',
    '**/*.css'
  ],
  esbuildOptions(options) {
    options.tsconfig = './tsconfig.json';
    options.loader = {
      ...options.loader,
      '.png': 'empty',
      '.jpg': 'empty',
      '.jpeg': 'empty',
      '.gif': 'empty',
      '.webp': 'empty',
      '.svg': 'empty',
      '.css': 'empty'
    };
  }
});
