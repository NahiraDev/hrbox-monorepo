import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  dts: {
    resolve: true
  },
  target: 'es2023',
  minify: false,
  outDir: 'dist',
  splitting: false,
  tsconfig: './tsconfig.json'
});
