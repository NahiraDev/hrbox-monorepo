import { createEndpoint } from '../../../../core';
import { HRLinkApiEndpoints } from '../../app/endpoints';
import { HRLinkBaseApi } from '../../app/baseApiConfig';

export const CommonApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCity: createEndpoint(build, HRLinkApiEndpoints.user.getUserCity, 'GET', ['Common']),
    educationGetFields: createEndpoint(build, HRLinkApiEndpoints.common.getFieldOfEducation, 'GET', ['Common']),
    getLocation: createEndpoint(build, HRLinkApiEndpoints.common.getLocation, 'GET', ['Common']),
    addLocation: createEndpoint(build, HRLinkApiEndpoints.common.addLocation, 'POST', ['Common']),
    editLocation: createEndpoint(build, HRLinkApiEndpoints.common.editLocation, 'POST', ['Common']),
  }),
  overrideExisting: false,
});

export const {
  useLazyFetchCityQuery,
  useLazyEducationGetFieldsQuery,
  useLazyGetLocationQuery,
  useEditLocationMutation,
  useAddLocationMutation,
} = CommonApi;
