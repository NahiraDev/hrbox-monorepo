export const createPaginatedEndpoint = (build: any, endpoint: string, method: string, tags: string[]) => {
  if (method === 'GET') {
    return build.query({
      query: (params: any) => {
        const safeParams = typeof params === 'string' ? { Search: params } : params;

        const paginationParams = {
          Page: safeParams.Page || 1,
          PageSize: safeParams.PageSize || 10,
        };

        return {
          url: endpoint,
          method: 'GET',
          params: { ...safeParams, ...paginationParams },
        };
      },
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
