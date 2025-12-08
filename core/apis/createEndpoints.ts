import type { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import type { PaginatedResponse, PaginationParams } from './types';

interface EndpointConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  tags?: readonly string[];
  transformResponse?: (baseQueryResponse: any) => PaginatedResponse<TData>;
}

export function createPaginatedQuery<TData>(
  build: EndpointBuilder<BaseQueryFn, string, string>,
  config: EndpointConfig
) {
  const {
    url,
    method = 'GET',
    tags = [],
    // You can still override per-endpoint if ever needed
    transformResponse,
  } = config;

  return build.query<PaginatedResponse<TData>, PaginationParams>({
    query: (params = {}) => {
      console.log('Incoming params:', params); // Log what you pass
      const { page = 0, pageSize = 10, search, sortBy, sortOrder, ...rest } = params;
      const builtParams = {
        page,
        pageSize,
        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...rest,
      };
      console.log('Built query params:', builtParams); // Log final parms
      return { url, method, params: builtParams };
    },

    // query: (params = {}) => {
    // const { page = 0, pageSize = 10, search, sortBy, sortOrder, ...rest } = params;

    // const queryParams = new URLSearchParams({
    //   page: String(page),
    //   pageSize: String(pageSize),
    //   ...(search && { search }),
    //   ...(sortBy && { sortBy }),
    //   ...(sortOrder && { sortOrder }),
    //   ...Object.fromEntries(
    //     Object.entries(rest).map(([k, v]) => [k, String(v)])
    //   ),
    // }).toString();

    // const fullUrl = `${url}?${queryParams}`;
    // console.log('RTK Query → Full URL:', fullUrl);   // ← THIS LINE

    // return {
    //   url,
    //   method,
    //   params: {
    //     page,
    //     pageSize,
    //     ...(search && { search }),
    //     ...(sortBy && { sortBy }),
    //     ...(sortOrder && { sortOrder }),
    //     ...rest,
    //   },
    // };
    // },
    // query: (params = {}) => {
    //   console.log('Incoming params:', params);
    //   const {
    //     page = 0,           // 0-based by default — matches your API
    //     pageSize = 10,
    //     search,
    //     sortBy,
    //     sortOrder,
    //     ...rest
    //   } = params;

    //   return {
    //     url,
    //     method,
    //     params: {
    //       page,
    //       pageSize,
    //       ...(search !== undefined && { search }),
    //       ...(sortBy && { sortBy }),
    //       ...(sortOrder && { sortOrder }),
    //       ...rest,
    //     },
    //   };
    // },

    providesTags: (result, error, arg) => [
      ...tags.map(tag => ({ type: tag } as const)),
      { type: tags[0] || 'Unknown', id: 'LIST' },
    ],

    // Universal transformResponse for your API
    transformResponse:
      transformResponse ??
      ((baseResponse: any): PaginatedResponse<TData> => {
        // Handle API wrapper: { data: {...}, msg, IsSucces }
        console.log('Raw API response:', baseResponse); // Log full response
        const payload = baseResponse?.data;
        console.log('Extracted payload:', payload);

        if (!payload) {
          return {
            data: [],
            meta: {
              page: 0,
              pageSize: 10,
              total: 0,
              totalPages: 0,
            },
          };
        }

        const list = payload.ViewList || payload.viewList || payload.items || payload.data || [];
        const currentPage = Number(payload.Page ?? payload.page ?? 0);
        const pageSize = Number(payload.PageSize ?? payload.pageSize ?? 10);
        const lastPage = payload.LastPage !== undefined ? Number(payload.LastPage) : undefined;

        // Total items = (lastPage + 1) * pageSize  (since pages are 0-based)
        const totalPages = lastPage !== undefined ? lastPage + 1 : 0;
        const totalItems = totalPages > 0 ? totalPages * pageSize : 0;

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

// export function createPaginatedQuery<TData>(
//   build: EndpointBuilder<any, any, any>,
//   config: EndpointConfig
// ) {
//   const {
//     url,
//     method = 'GET',
//     tags = [],
//     transformResponse,
//   } = config;

//   return build.query<PaginatedResponse<TData>, PaginationParams>({
//     query: (params = {}) => {
//       const {
//         page = 1,
//         pageSize = 10,
//         search,
//         sortBy,
//         sortOrder,
//         ...rest
//       } = params;

//       return {
//         url,
//         method,
//         params: {
//           Page: page,
//           PageSize: pageSize,
//           ...(search && { Search: search }),
//           ...(sortBy && { SortBy: sortBy }),
//           ...(sortOrder && { SortOrder: sortOrder }),
//           ...rest,
//         },
//       };
//     },
//     providesTags: (result, error, arg) => [
//       ...tags,
//       { type: tags[0] as string, id: 'LIST' },
//     ],

//     // Use custom transform if provided, otherwise fall back to default logic
//     transformResponse:
//       transformResponse ??
//       ((response: any): PaginatedResponse<TData> => {
//         if (response.data && response.meta) return response;

//         return {
//           data: response.items || response.data || response || [],
//           meta: {
//             page: response.page || 1,
//             pageSize: response.pageSize || response.size || 10,
//             total: response.total || response.totalCount || 0,
//             totalPages:
//               response.totalPages ||
//               Math.ceil((response.total || 0) / (response.pageSize || 10)),
//           },
//         };
//       }),
//   });
// }

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