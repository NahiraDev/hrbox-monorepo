import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from '@hrbox-monorepo/modules/hrlink/app/endpoints';

const userApi = createModuleApi({
  reducerPath: 'userApi',
  baseUrl: 'https://hrlink.hrbox.me:50443',
  tagTypes: ['User'],
  requiresAuth: true,
  autoToast: true,
});

export const userApiWithEndpoints = userApi.injectEndpoints({ 
    endpoints: (build) => ({
        // GET: Fetch Cities
        fetchCity: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getUserCity,
          method: 'GET',
          tags: ['User'],
        }),
})
})


export const {
    useFetchCityQuery,
} = userApiWithEndpoints;