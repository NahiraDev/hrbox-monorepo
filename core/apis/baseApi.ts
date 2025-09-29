import { createApi } from '@reduxjs/toolkit/query/react';

import createBaseQuery from '@core/apis/createBaseQuery';

export const createBaseApi = (
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
