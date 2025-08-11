import { defineConfig } from "tsup";
import { baseConfig } from "@configs/tsup.config.base.ts";

export default defineConfig({
  ...baseConfig,
  entry: ["index.tsx"],
});