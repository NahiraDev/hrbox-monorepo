export const createPaginatedEndpoint = (build: any, endpoint: string, method: string, tags: string[]) => {
  if (method === 'GET') {
    return build.query({
      query: (params: any) => {
        const paginationParams = {
          Page: params.Page || 1,
          PageSize: params.PageSize || 10
        };

        return {
          url: endpoint,
          method: 'GET',
          params: { ...params, ...paginationParams },
        };
      },
      providesTags: tags,
    });
  } else if (method === 'GET') {
    return build.query({
      query: (params: any) => ({ url: endpoint, method: 'GET', params }),
      providesTags: tags,
    });
  } else {
    return build.mutation({
      query: (body: any) => ({
        url: endpoint,
        method,
        body: body ?? undefined,
      }),
      invalidatesTags: tags,
    });
  }
};
