import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./postcss.config.ts' , './tailwind.config.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: {
    resolve: true
  },
  splitting: false,
});
