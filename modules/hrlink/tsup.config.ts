import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['app/register.ts'],
  format: ['esm' , 'cjs'],
  sourcemap: true,
  clean: true,
  splitting: false,
  dts: true,
  target: 'es2023',
  outDir: 'dist',
  minify: true,
  tsconfig: './tsconfig.json',
  bundle: true,
  esbuildOptions(options) {
    options.logOverride = {
      'equals-negative-zero': 'silent',
      'direct-eval': 'silent'
    };
    options.loader = {
      ...options.loader,
      '.png': 'file',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.gif': 'file',
      '.webp': 'file',
      '.svg': 'file',
      '.css': 'css',
      '.eot': 'file',
      '.woff': 'file',
      '.woff2': 'file',
      '.ttf': 'file'
    }
  },
  external: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.webp',
    '**/*.svg',
    '**/*.ico',
    '**/*.css',
    '**/*.eot',
    '**/*.woff',
    '**/*.woff2',
    '**/*.ttf',
    '**/*.css.map',
  ],
});
