import {
  fetchBaseQuery,
  type FetchArgs,
  type BaseQueryFn,
  type FetchBaseQueryError,
  type BaseQueryApi,
  type QueryReturnValue,
} from '@reduxjs/toolkit/query';

import { setError } from '../redux';

const createBaseQuery = (
  baseUrl: string,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
  });

  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {},
  ): Promise<QueryReturnValue<unknown, FetchBaseQueryError, {}>> => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error) {
      const message = (result.error as any)?.data?.msg || 'خطایی رخ داد';

      setError(message);
    }

    return {
      ...result,
      meta: result.meta ?? {},
    } as QueryReturnValue<unknown, FetchBaseQueryError, {}>;
  };
};

export default createBaseQuery;
