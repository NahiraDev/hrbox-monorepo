import { createBaseApi } from '@core/apis';

export const SSOHRLinkBaseApi = createBaseApi(
  'https://hrlink.hrbox.me',
  'SSOHRLink',
  ['SSOHRLink' , 'User'] as const
);
