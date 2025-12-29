import { createModuleApi } from "@hrbox/core/apis/baseApi";

export const HRLinkApi = createModuleApi({
  reducerPath: "HRLinkApi",
  baseUrl: "https://hrlink.hrbox.me/DesktopModules/Freelancer/api",
  tagTypes: [
    "Award",
    "Course",
    "Education",
    "Experience",
    "Skill",
    "Job",
    "Company",
    "Profile",
    "User",
    "Dashboard",
    "Common"
  ],
  requiresAuth: true,
  autoToast: true
});