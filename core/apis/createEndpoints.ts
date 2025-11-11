import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type { PaginatedResponse, PaginationParams } from './types';

interface EndpointConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  tags?: readonly string[];
}

/**
 * Create a paginated query endpoint
 */
export function createPaginatedQuery<TData>(
  build: EndpointBuilder<any, any, any>,
  { url, tags = [] }: EndpointConfig
) {
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
        method: 'GET',
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
    // Transform response to ensure consistent format
    transformResponse: (response: any): PaginatedResponse<TData> => {
      // If response already has correct format
      if (response.data && response.meta) {
        return response;
      }

      // If response is array with pagination headers
      return {
        data: response.items || response.data || response,
        meta: {
          page: response.page || 1,
          pageSize: response.pageSize || response.size || 10,
          total: response.total || response.totalCount || 0,
          totalPages: response.totalPages || Math.ceil((response.total || 0) / (response.pageSize || 10)),
        },
      };
    },
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
export function createMutation<TData, TBody>(
  build: EndpointBuilder<any, any, any>,
  { url, method = 'POST', tags = [] }: EndpointConfig
) {
  return build.mutation<TData, TBody>({
    query: (body) => ({
      url,
      method,
      body,
    }),
    invalidatesTags: tags,
  });
}