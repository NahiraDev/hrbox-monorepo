import {
  fetchBaseQuery,
  type FetchArgs,
  type BaseQueryFn,
  type FetchBaseQueryError,
  type BaseQueryApi,
  type QueryReturnValue,
} from '@reduxjs/toolkit/query';

import { setError } from '@core/redux';
import { logout, updateToken } from '@core/redux/reducers/authSlice';

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

const createBaseQuery = (
  baseUrl: string,
  requiresAuth: boolean = true,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include', // برای دریافت و ارسال کوکی‌ها
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
      // فقط Content-Type - مثل Postman
      headers.set('Content-Type', 'application/json');

      // Authorization فقط برای درخواست‌های بعد از Login
      if (requiresAuth) {
        const token = (getState() as any).auth?.token;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }

      return headers;
    },
  });

  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {},
  ): Promise<QueryReturnValue<unknown, FetchBaseQueryError, {}>> => {
    let result = await rawBaseQuery(args, api, extraOptions);

    // Handle 401 Unauthorized
    if (result.error && result.error.status === 401) {
      if (isRefreshing && refreshPromise) {
        await refreshPromise;
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        isRefreshing = true;

        refreshPromise = (async () => {
          try {
            const refreshToken = (api.getState() as any).auth?.refreshToken;

            if (refreshToken) {
              const refreshResult = await rawBaseQuery(
                {
                  url: '/auth/refresh-token',
                  method: 'POST',
                  body: { refreshToken },
                },
                api,
                extraOptions
              );

              if (refreshResult.data) {
                const newToken = (refreshResult.data as any).accessToken;
                api.dispatch(updateToken(newToken));
                return true;
              }
            }

            api.dispatch(logout());
            window.location.href = '/sso/login';
            return false;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();

        const refreshed = await refreshPromise;
        if (refreshed) {
          result = await rawBaseQuery(args, api, extraOptions);
        }
      }
    }

    // Handle errors
    if (result.error) {
      const message = (result.error as any)?.data?.msg || 'خطایی رخ داد';
      api.dispatch(setError(message));

      if (result.error.status === 403) {
        api.dispatch(setError('دسترسی مجاز نیست'));
      }
    }

    return {
      ...result,
      meta: result.meta ?? {},
    } as QueryReturnValue<unknown, FetchBaseQueryError, {}>;
  };
};

export default createBaseQuery;
