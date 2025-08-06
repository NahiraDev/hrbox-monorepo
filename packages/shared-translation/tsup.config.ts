import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  dts: false,
  target: 'es2023',
  minify: false,
  outDir: 'dist',
  splitting: false,
});
