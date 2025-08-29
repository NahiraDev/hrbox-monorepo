import createBaseApi from '../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../core';
import { HRLinkApiEndpoints } from '../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Common', [
  'Common',
] as const);

export const CommonApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCity: createEndpoint(
      build,
      HRLinkApiEndpoints.user.getUserCity,
      'GET',
      ['Common'],
    ),
    educationGetFields: createEndpoint(
      build,
      HRLinkApiEndpoints.common.getFieldOfEducation,
      'GET',
      ['Common'],
    ),
    getLocation: createEndpoint(
      build,
      HRLinkApiEndpoints.common.getLocation,
      'GET',
      ['Common'],
    ),
    addLocation: createEndpoint(
      build,
      HRLinkApiEndpoints.common.addLocation,
      'POST',
      ['Common'],
    ),
    editLocation: createEndpoint(
      build,
      HRLinkApiEndpoints.common.editLocation,
      'POST',
      ['Common'],
    ),
  }),
  overrideExisting: false,
});

export const { useLazyFetchCityQuery, useLazyEducationGetFieldsQuery , useLazyGetLocationQuery , useEditLocationMutation , useAddLocationMutation } =
  CommonApi;
