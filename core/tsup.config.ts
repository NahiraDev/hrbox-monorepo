import { defineConfig } from 'tsup';

import { baseConfig } from '../configs/tsup.config.base';

export default defineConfig({
  ...baseConfig,
  entry: ['index.ts'],
});
