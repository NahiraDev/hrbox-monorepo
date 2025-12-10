import { createModuleApi } from "@hrbox/core/apis/baseApi";

export const HRLinkApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api', 
  tagTypes: ['Company' , 'Award'],
  requiresAuth: true,
  autoToast: true,
});