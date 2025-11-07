import { createBaseApi } from '@core/apis';

export const SSOHRLinkBaseApi = createBaseApi(
  'https://hrlink.hrbox.me:50443',
  'SSOHRLink',
  ['SSOHRLink' , 'User'] as const
);
