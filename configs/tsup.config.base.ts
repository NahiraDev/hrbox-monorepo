import * as path from 'node:path';

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
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-redux'],
  esbuildOptions(options) {
    options.plugins = options.plugins || [];
    options.plugins.push({
      name: 'alias',
      setup(build) {
        build.onResolve({ filter: /^@assets\// }, (args) => {
          const resolvedPath = path.resolve(
            __dirname,
            '../packages/app-assets',
            args.path.replace(/^@assets\//, ''),
          );

          return { path: resolvedPath };
        });
      },
    });
  },
};

export default defineConfig(baseConfig);
