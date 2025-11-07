import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from "path"

import { fileURLToPath } from "url"
import { mergeConfig } from 'vite';
import * as path from 'node:path';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  async viteFinal(config: { define: any; }) {
    config.define = {
      ...config.define,
      'development': 'true',
    };
    return mergeConfig(config, {
      resolve: {
        dedupe: [
          'react',
          'react-dom',
          'tailwindcss',
        ],
      },
    });
  },
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  }
};
export default config;
