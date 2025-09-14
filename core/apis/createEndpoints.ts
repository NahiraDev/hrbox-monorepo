import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type { QueryDefinition, MutationDefinition } from '@reduxjs/toolkit/query';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export function createEndpoint<TReq = void, TRes = any>(
  build: EndpointBuilder<any, any, any>,
  url: string,
  method: 'GET',
  tags?: readonly string[],
): QueryDefinition<TReq, any, any, TRes>;

export function createEndpoint<TReq = void, TRes = any>(
  build: EndpointBuilder<any, any, any>,
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  tags?: readonly string[],
): MutationDefinition<TReq, any, any, TRes>;

export function createEndpoint<TReq = void, TRes = any>(
  build: EndpointBuilder<any, any, any>,
  url: string,
  method: HttpMethod = 'GET',
  tags: readonly string[] = [],
) {
  if (method === 'GET') {
    return build.query<TRes, TReq>({
      query: (params) => ({ url, method, params }),
      providesTags: tags,
    });
  } else {
    return build.mutation<TRes, TReq>({
      query: (body) => ({ url, method, body: body ?? undefined }),
      invalidatesTags: tags,
    });
  }
}
