import { createApi } from '@reduxjs/toolkit/query/react';

import createBaseQuery from './createBaseQuery';

const createBaseApi = (baseUrl: string, reducerPath: string, tagTypes: readonly string[]) => {
  return createApi({
    reducerPath,
    baseQuery: createBaseQuery(baseUrl),
    tagTypes,
    endpoints: () => ({}),
  });
};

export default createBaseApi;
