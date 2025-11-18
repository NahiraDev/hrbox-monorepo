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

// This endpoints corespond to Master/ path
export const commonApiWithEndpoints = commonApi.injectEndpoints({
  endpoints: (build) => ({
    // GET: GetJobGroup
    fetchJobGroup: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getJobGroup,
      method: 'GET',
      tags: ['Common'],
    }),

    // GET: fetchJobCategory
    fetchJobCategory: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getJobCategory,
      method: 'GET',
      tags: ['Common'],
    }),

    // GET:  fetchMilitaryStatus
    fetchMilitaryStatus: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getMilitaryStatus,
      method: 'GET',
      tags: ['Common'],
    }),

    fetchPlaceByLevel: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getPlaceByLevel,
      method: 'GET',
      tags: ['Common'],
    }),

    fetchIndustry: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getIndustry,
      method: 'GET',
      tags: ['Common'],
    }),

    fetchFieldOfEducation: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getFieldOfEducation,
      method: 'GET',
      tags: ['Common'],
    }),

    fetchRequestOrg: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getRequestOrg,
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

    // GET: Locations
    getLocation: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getLocation,
      method: 'GET',
      tags: ['Common'],
    }),

    // GET: Education Fields
    educationGetFields: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getFieldOfEducation,
      method: 'GET',
      tags: ['Common'],
    }),

    saveTemplateFile: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.saveTemplateFile,
      method: 'POST',
      tags: ['Common'],
    }),

    deleteTemplateFile: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.saveTemplateFile,
      method: 'DELETE',
      tags: ['Common'],
    }),

  }),
});

export const {
  useFetchJobGroupQuery,
  useFetchJobCategoryQuery,
  useFetchMilitaryStatusQuery,
  useFetchPlaceByLevelQuery,
  useFetchIndustryQuery,
  useEducationGetFieldsQuery,
  useFetchRequestOrgQuery,
  useAddLocationMutation,
  useEditLocationMutation,
  useGetLocationQuery,
  useSaveTemplateFileMutation,
  useDeleteTemplateFileMutation,
} = commonApiWithEndpoints;