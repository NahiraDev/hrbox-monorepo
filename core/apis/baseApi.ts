import { createApi } from '@reduxjs/toolkit/query/react';

import createBaseQuery from './createBaseQuery';

interface PaginationParams {
  Page?: number;
  PageSize?: number;
}

export const withPagination = <T extends Record<string, any>>(
  params: T,
  pagination?: PaginationParams
): T & PaginationParams => ({
  ...params,
  ...(pagination || {})
});

const createBaseApi = (
  baseUrl: string,
  reducerPath: string,
  tagTypes: readonly string[],
) => {
  return createApi({
    reducerPath,
    baseQuery: createBaseQuery(baseUrl),
    tagTypes,
    endpoints: () => ({}),
  });
};

export default createBaseApi;
