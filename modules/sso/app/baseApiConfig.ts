import { createBaseApi } from '@core/apis';

export const SSOHRLinkBaseApi = createBaseApi(
  import.meta.env.VITE_SSO_API_URL,
  'SSOHRLink',
  ['SSOHRLink'] as const
);
