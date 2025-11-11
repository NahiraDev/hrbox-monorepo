import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from '@hrbox-monorepo/modules/hrlink/app/endpoints';

const commonApi = createModuleApi({
  reducerPath: 'commonApi',
  baseUrl: 'https://hrlink.hrbox.me:50443',
  tagTypes: ['Common'],
  requiresAuth: true,
  autoToast: true,
});

export const commonApiWithEndpoints = commonApi.injectEndpoints({
  endpoints: (build) => ({
    // GET: Fetch Cities
    fetchCity: createQuery<any>(build, {
      url: HRLinkApiEndpoints.user.getUserCity,
      method: 'GET',
      tags: ['Common'],
    }),

    // GET: Education Fields
    educationGetFields: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getFieldOfEducation,
      method: 'GET',
      tags: ['Common'],
    }),

    // GET: Locations
    getLocation: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getLocation,
      method: 'GET',
      tags: ['Common'],
    }),

    // POST: Add Location
    addLocation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.addLocation,
      method: 'POST',
      tags: ['Common'],
    }),

    // POST: Edit Location
    editLocation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.editLocation,
      method: 'POST',
      tags: ['Common']
    }),
  }),
});

export const {
  useLazyFetchCityQuery,
  useLazyEducationGetFieldsQuery,
  useLazyGetLocationQuery,
  useAddLocationMutation,
  useEditLocationMutation,
} = commonApiWithEndpoints;