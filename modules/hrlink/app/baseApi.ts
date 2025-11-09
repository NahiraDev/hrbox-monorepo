import { createModuleApi } from "@hrbox/core/apis/baseApi";

export const HRLinkApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api', // Adjust base URL as needed
  tagTypes: ['Company' , 'Award'],
  requiresAuth: true,
  autoToast: true,
});