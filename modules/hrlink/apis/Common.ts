import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from '@hrbox/modules/hrlink/app/endpoints';
import { HRLinkApi } from '@module/hrlink/app/baseApi';


export const commonApiWithEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchJobGroup: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getJobGroup,
      method: 'GET',
      tags: ['Common'],
    }),

    fetchJobCategory: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getJobCategory,
      method: 'GET',
      tags: ['Common'],
    }),

    fetchMilitaryStatus: createQuery<any> (build,{
      url: HRLinkApiEndpoints.common.getMilitaryStatus,
      method: 'GET',
      tags: ['Common'],
    }),

    fetchPlaceByLevel: createQuery<any, {level: number}> (build,{
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

    fetchRequestOrg: createQuery<any, {orgid: number}> (build,{
      url: HRLinkApiEndpoints.common.getRequestOrg,
      method: 'GET',
      tags: ['Common'],
    }),

    addLocation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.addLocation,
      method: 'POST',
      tags: ['Common'],
    }),

    editLocation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.editLocation,
      method: 'POST',
      tags: ['Common']
    }),

    getLocation: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getLocation,
      method: 'GET',
      tags: ['Common'],
    }),

    deleteLocation: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.deleteLocation,
      method:'DELETE',
      tags: ['Common'],
    }),

    educationGetFields: createQuery<any>(build, {
      url: HRLinkApiEndpoints.common.getFieldOfEducation,
      method: 'GET',
      tags: ['Common'],
    }),

    saveTempFile: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.common.saveTempFile,
      method: 'POST',
      tags: ['Common'],
    }),

    deleteFile: createMutation<any, {fileid: number}>(build, {
      url: HRLinkApiEndpoints.common.deleteFile,
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
  useDeleteLocationMutation,
  useGetLocationQuery,
  useSaveTempFileMutation,
  useDeleteFileMutation,
} = commonApiWithEndpoints;