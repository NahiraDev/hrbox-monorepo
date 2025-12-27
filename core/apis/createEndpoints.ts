import type { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import type { PaginatedResponse, PaginationParams } from './types';

interface EndpointConfig {
  url: string | ((arg: any) => string); // Allow function for dynamic URLs
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  tags?: readonly string[];
  transformResponse?: (baseQueryResponse: any) => any;
  isPaginated?: boolean;
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
    isPaginated = true,
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
        ...rest,
      };
      console.log('Built query params:', builtParams);
      return { url: typeof url === 'function' ? url(params) : url, method, params: builtParams };
    },

    providesTags: (result, error, arg) => [
      ...tags.map(tag => ({ type: tag } as const)),
      { type: tags[0] || 'Unknown', id: 'LIST' },
    ],

    transformResponse: transformResponse ?? ((baseResponse: any): PaginatedResponse<TData> => {
      const payload = baseResponse?.data;

      if (!payload) {
        return {
          data: [],
          meta: { page: 0, pageSize: 10, total: 0, totalPages: 0 },
        };
      }

      if (!isPaginated) {
        const list = payload.ViewList || payload.viewList || payload.items || payload.data || payload || [];
        return {
          data: Array.isArray(list) ? list : [list],
          meta: { page: 0, pageSize: list.length, total: list.length, totalPages: 1 },
        };
      }

      const list = payload.ViewList || payload.viewList || payload.items || payload.data || [];
      const currentPage = Number(payload.Page ?? payload.page ?? 0);
      const pageSize = Number(payload.PageSize ?? payload.pageSize ?? 10);
      const lastPage = payload.LastPage !== undefined ? Number(payload.LastPage) : Math.ceil(list.length / pageSize) - 1;
      const totalPages = lastPage >= 0 ? lastPage + 1 : 0;
      const totalItems = payload.TotalCount ?? (totalPages * pageSize);

      console.log(`CreatePaginated query returns this structure of data: \ndata: ${list}\nmeta:\n{page: ${currentPage}, pageSize: ${pageSize}, \ntotal: ${totalItems}, totalPages: ${totalPages}}`);
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
      url: typeof url === 'function' ? url(params) : url,
      method: 'GET',
      params: params || undefined,
    }),
    providesTags: tags,
    transformResponse: transformResponse ?? ((baseResponse: any): TData => {
      if (baseResponse?.IsSucces === false) {
        throw new Error(baseResponse?.msg || 'API Error');
      }
      const payload = baseResponse?.data;
      console.log(`CreateQuery returns a payload like this \n${payload}`);
      return payload || null;
    }),
  });
}

export function createMutation<TData, TArg>(
  build: EndpointBuilder<any, any, any>,
  config: {
    url: string | ((arg: TArg) => string);
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    tags?: string[];
    transformResponse?: (baseQueryResponse: any) => TData;
  }
) {
  const {
    url,
    method = 'POST',
    tags = [],
    transformResponse,
  } = config;

  return build.mutation<TData, TArg>({
    query: (arg) => {
      const finalUrl = typeof url === 'function' ? url(arg) : url;
      const upperMethod = method.toUpperCase();
      const isBodyMethod = ['POST', 'PUT', 'PATCH'].includes(upperMethod);
      console.log(`Mutation query: URL=${finalUrl}, Method=${upperMethod}, Arg=${JSON.stringify(arg)}`);
      return {
        url: finalUrl,
        method: upperMethod,
        ...(isBodyMethod ? { body: arg } : { params: arg }),
      };
    },
    invalidatesTags: (result, error, arg) => [
      ...tags.map(tag => ({ type: tag as string, id: 'LIST' })),
      ...tags.map(tag => ({ type: tag as string })),
    ],
    transformResponse: transformResponse ?? ((baseResponse: any): TData => {
      console.log('Mutation raw response:', baseResponse);
      if (baseResponse?.IsSucces === false) {
        throw new Error(baseResponse?.msg || 'API Error');
      }
      return baseResponse?.data || null;
    }),
  });
}