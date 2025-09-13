import createBaseApi from 'core/apis/baseApi';

export const SSOHRLinkBaseApi = createBaseApi('https://api.hrbox.com', 'SSOHRLink', ['SSOHRLink'] as const);
