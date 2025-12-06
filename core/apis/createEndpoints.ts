import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type { PaginatedResponse, PaginationParams } from './types';

interface EndpointConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  tags?: readonly string[];
  transformResponse?: (baseQueryResponse: any) => PaginatedResponse<TData>;
}

export function createPaginatedQuery<TData>(
  build: EndpointBuilder<any, any, any>,
  config: EndpointConfig
) {
  const {
    url,
    method = 'GET',
    tags = [],
    transformResponse,
  } = config;

  return build.query<PaginatedResponse<TData>, PaginationParams>({
    query: (params = {}) => {
      const {
        page = 1,
        pageSize = 10,
        search,
        sortBy,
        sortOrder,
        ...rest
      } = params;

      return {
        url,
        method,
        params: {
          Page: page,
          PageSize: pageSize,
          ...(search && { Search: search }),
          ...(sortBy && { SortBy: sortBy }),
          ...(sortOrder && { SortOrder: sortOrder }),
          ...rest,
        },
      };
    },
    providesTags: (result, error, arg) => [
      ...tags,
      { type: tags[0] as string, id: 'LIST' },
    ],

    // Use custom transform if provided, otherwise fall back to default logic
    transformResponse:
      transformResponse ??
      ((response: any): PaginatedResponse<TData> => {
        if (response.data && response.meta) return response;

        return {
          data: response.items || response.data || response || [],
          meta: {
            page: response.page || 1,
            pageSize: response.pageSize || response.size || 10,
            total: response.total || response.totalCount || 0,
            totalPages:
              response.totalPages ||
              Math.ceil((response.total || 0) / (response.pageSize || 10)),
          },
        };
      }),
  });
}

export function createQuery<TData, TParams = void>(
  build: EndpointBuilder<any, any, any>,
  { url, tags = [] }: EndpointConfig
) {
  return build.query<TData, TParams>({
    query: (params) => ({
      url,
      method: 'GET',
      params: params || undefined,
    }),
    providesTags: tags,
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
      ...(method !== 'GET' && method !== 'DELETE' ? { body: arg } : {}),
    }),
    invalidatesTags: (result, error, arg) => [
      ...tags.map(tag => ({ type: tag, id: 'LIST' } as const)),
      ...tags.map(tag => ({ type: tag } as const)), // optional: invalidate single items too
    ],
  });
}