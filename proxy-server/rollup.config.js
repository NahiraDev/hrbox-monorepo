import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'server.ts',
  output: {
    file: '../dist/proxy-server/server.js',
    format: 'esm',
    sourcemap: true,
  },
  external: [
    'fs', 'path', 'http', 'https', 'crypto', 'util',
    'stream', 'buffer', 'events', 'url', 'net',
    'tls', 'zlib', 'querystring', 'os',
    'express', 'cors', 'helmet', 'morgan',
    'compression', 'dotenv', 'http-proxy-middleware'
  ],
  plugins: [
    json(),
    resolve({
      preferBuiltins: true,
      exportConditions: ['node']
    }),
    commonjs({
      ignoreDynamicRequires: true,
      transformMixedEsModules: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    })
  ]
};
