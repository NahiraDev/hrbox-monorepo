import type { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import type { PaginatedResponse, PaginationParams } from './types';

interface EndpointConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  tags?: readonly string[];
  transformResponse?: (baseQueryResponse: any) => any; // Generic for any shape
  isPaginated?: boolean; // New: false for non-paginated "list" endpoints
}

export function createPaginatedQuery<TData>(
  build: EndpointBuilder<BaseQueryFn, string, string>,
  config: EndpointConfig
) {
  const {
    url,
    method = 'GET',
    tags = [],
    transformResponse,
    isPaginated = true, // Default to paginated
  } = config;

  return build.query<PaginatedResponse<TData>, PaginationParams>({
    query: (params = {}) => {
      console.log('Incoming params:', params);
      const { page = 0, pageSize = 10, search, sortBy, sortOrder, ...rest } = params;
      const builtParams = {
        page,
        pageSize,
        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...rest, // Includes extras like 'type=1' for GetUniversity
      };
      console.log('Built query params:', builtParams);
      return { url, method, params: builtParams };
    },

    providesTags: (result, error, arg) => [
      ...tags.map(tag => ({ type: tag } as const)),
      { type: tags[0] || 'Unknown', id: 'LIST' },
    ],

    transformResponse: transformResponse ?? ((baseResponse: any): PaginatedResponse<TData> => {
      console.log('Raw API response:', baseResponse);
      const payload = baseResponse?.data;
      console.log('Extracted payload:', payload);

      if (!payload) {
        return {
          data: [],
          meta: { page: 0, pageSize: 10, total: 0, totalPages: 0 },
        };
      }

      if (!isPaginated) {
        // For non-paginated "lists" (e.g., GetUniversity returns full array)
        const list = payload.ViewList || payload.viewList || payload.items || payload.data || payload || [];
        return {
          data: Array.isArray(list) ? list : [list],
          meta: { page: 0, pageSize: list.length, total: list.length, totalPages: 1 },
        };
      }

      // Paginated case (e.g., GetList)
      const list = payload.ViewList || payload.viewList || payload.items || payload.data || [];
      const currentPage = Number(payload.Page ?? payload.page ?? 0);
      const pageSize = Number(payload.PageSize ?? payload.pageSize ?? 10);
      const lastPage = payload.LastPage !== undefined ? Number(payload.LastPage) : Math.ceil(list.length / pageSize) - 1;
      const totalPages = lastPage >= 0 ? lastPage + 1 : 0;
      const totalItems = payload.TotalCount ?? (totalPages * pageSize); // Use TotalCount if available, else estimate

      return {
        data: list,
        meta: {
          page: currentPage,
          pageSize,
          total: totalItems,
          totalPages,
        },
      };
    }),
  });
}

export function createQuery<TData, TParams = void>(
  build: EndpointBuilder<any, any, any>,
  { url, tags = [], transformResponse }: EndpointConfig & { transformResponse?: (baseQueryResponse: any) => TData }
) {
  return build.query<TData, TParams>({
    query: (params) => ({
      url,
      method: 'GET',
      params: params || undefined,
    }),
    providesTags: tags,
    // Optional custom transform for details (e.g., handle null data)
    transformResponse: transformResponse ?? ((baseResponse: any): TData => {
      const payload = baseResponse?.data;
      if (!payload && baseResponse?.IsSuccess === false) {
        throw new Error(baseResponse?.msg || 'API Error');
      }
      return payload || null; // Return null for "empty" success
    }),
  });
}

/**
 * Create a mutation endpoint (POST, PUT, PATCH, DELETE)
 */
export function createMutation<TData, TArg>(
  build: EndpointBuilder<any, any, any>,
  { url, method = 'POST', tags = [] }: {
    url: string | ((arg: TArg) => string);
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    tags?: string[];
  }
) {
  return build.mutation<TData, TArg>({
    query: (arg) => ({
      url: typeof url === 'function' ? url(arg) : url,
      method,
      body: arg, // Automatically JSON-stringified by RTK; send as { Address: "...", Long: 35.81, Lat: 51.38 }
    }),
    invalidatesTags: (result, error, arg) => [
      ...tags.map(tag => ({ type: tag, id: 'LIST' } as const)),
      ...tags.map(tag => ({ type: tag } as const)),
    ],
  });
}