import {
  fetchBaseQuery,
  type FetchArgs,
  type BaseQueryFn,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { RootState } from "@hrbox/core/";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

interface BaseQueryConfig {
  baseUrl: string;
  requiresAuth?: boolean;
  autoToast?: boolean;
}

export function createEnhancedBaseQuery({
                                          baseUrl,
                                          requiresAuth = true,
                                          autoToast = true,
                                        }: BaseQueryConfig): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {

  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      if (requiresAuth) {
        const token = state.auth?.token;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }

      // Add language header
      const lang = state.language?.lang || 'en';
      headers.set('Accept-Language', lang);

      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    // Extract method
    const method = typeof args === 'string' ? 'GET' : args.method || 'GET';
    const isGetRequest = method === 'GET';

    let result = await rawBaseQuery(args, api, extraOptions);

    // Handle 401 Unauthorized (Token Refresh)
    if (result.error?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = handleTokenRefresh(api, rawBaseQuery, extraOptions);
      }

      const refreshed = await refreshPromise;
      if (refreshed) {
        result = await rawBaseQuery(args, api, extraOptions);
      }

      isRefreshing = false;
      refreshPromise = null;
    }

    // Auto Toast System
    if (autoToast && !isGetRequest) {
      if (result.error) {
        handleErrorToast(result.error);
      } else {
        handleSuccessToast(method);
      }
    }

    return result;
  };
}

// Token Refresh Handler
async function handleTokenRefresh(
  api: any,
  rawBaseQuery: any,
  extraOptions: any
): Promise<boolean> {
  try {
    const state = api.getState() as RootState;
    const refreshToken = state.auth?.refreshToken;

    if (!refreshToken) {
      handleLogout(api);
      return false;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { token } = refreshResult.data as { token: string };
      api.dispatch({ type: 'auth/updateToken', payload: token });
      return true;
    }

    handleLogout(api);
    return false;
  } catch {
    handleLogout(api);
    return false;
  }
}

// Logout Handler
function handleLogout(api: any) {
  api.dispatch({ type: 'auth/logout' });
  window.location.href = '/sso/login';
}

// Error Toast Handler
function handleErrorToast(error: FetchBaseQueryError) {
  const message =
    (error.data as any)?.message ||
    (error.data as any)?.msg ||
    'خطایی رخ داد';

  switch (error.status) {
    case 400:
      toast.error('درخواست نامعتبر', { description: message });
      break;
    case 403:
      toast.error('دسترسی مجاز نیست', { description: message });
      break;
    case 404:
      toast.error('یافت نشد', { description: message });
      break;
    case 500:
      toast.error('خطای سرور', { description: message });
      break;
    default:
      toast.error('خطا', { description: message });
  }
}

// Success Toast Handler
function handleSuccessToast(method: string) {
  const messages: Record<string, string> = {
    POST: 'با موفقیت ایجاد شد',
    PUT: 'با موفقیت ویرایش شد',
    PATCH: 'با موفقیت به‌روزرسانی شد',
    DELETE: 'با موفقیت حذف شد',
  };

  const message = messages[method] || 'عملیات موفق';
  toast.success(message);
}