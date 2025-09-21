import { defineConfig, type Options } from 'tsup';

export const baseConfig: Options = {
  format: ['esm'],
  sourcemap: true,
  clean: true,
  dts: true,
  target: 'es2023',
  outDir: 'dist',
  minify: false,
  injectStyle: false,
  tsconfig: '../tsconfig.json',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-redux'],
  esbuildOptions(options) {
    options.tsconfig = '../tsconfig.json';
  }
};

export default defineConfig(baseConfig);
