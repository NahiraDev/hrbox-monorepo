import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const awardApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Award'],
  requiresAuth: true,
  autoToast: true,
});

export const awardApiEndpoints = awardApi.injectEndpoints({
  endpoints: (build:any) => ({

    createAward: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.award.create,
      method: 'POST',
      tags: ['Award'],
    }),

    editAward: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.award.edit,
      method: 'POST',
      tags: ['Award'],
    }),

    deleteAward: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.award.delete,
      method: 'DELETE',
      tags: ['Award'],
    }),

    fetchAwards: createPaginatedQuery<any>(build, {
      // url: HRLinkApiEndpoints.resume.award.getList,
      // method: 'GET',
      // tags: ['Award'],

      url: HRLinkApiEndpoints.resume.award.getList,
      method: 'GET',
      tags: ['Award'],
      // Add custom transformResponse to match your real API
      transformResponse: (response: any) => {
        // Your actual backend format
        const backendData = response.data; // { ViewList, LastPage, Page, PageSize }

        return {
          data: backendData.ViewList || [],
          meta: {
            page: (backendData.Page || 0) + 1,        // Your backend uses 0-based, but UI usually wants 1-based
            pageSize: backendData.PageSize || 10,
            total: (backendData.LastPage + 1) * backendData.PageSize, // approximate total items
            totalPages: backendData.LastPage + 1,     // since Page: 0 → LastPage: 2 means 3 pages
          },
        };
      },
    }),

    fetchAwardDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.award.getDetail,
      tags: ['Award'],
    }),

  }),
});

export const {
  useFetchAwardsQuery,
  useFetchAwardDetailQuery,
  useCreateAwardMutation,
  useEditAwardMutation,
  useDeleteAwardMutation,
} = awardApiEndpoints;
