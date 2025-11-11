import { createApi } from "@reduxjs/toolkit/query/react";
import { createEnhancedBaseQuery } from "./createBaseQuery";

interface ApiConfig {
  reducerPath: string;
  baseUrl: string;
  tagTypes?: readonly string[];
  requiresAuth?: boolean;
  autoToast?: boolean;
}

export function createModuleApi({
                                  reducerPath,
                                  baseUrl,
                                  tagTypes = [],
                                  requiresAuth = true,
                                  autoToast = true
                                }: ApiConfig) {
  return createApi({
    reducerPath,
    baseQuery: createEnhancedBaseQuery({
      baseUrl,
      requiresAuth,
      autoToast
    }),
    tagTypes: [...tagTypes],
    endpoints: () => ({})
  });
}
