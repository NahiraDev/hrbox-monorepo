import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const experienceApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: 'https://hrlink.hrbox.me:50443/DesktopModules/Freelancer/api',
  tagTypes: ['Experience'],
  requiresAuth: true,
  autoToast: true,
});

export const experienceApiEndpoints = experienceApi.injectEndpoints({
  endpoints: (build: any) => ({
    // Create new experience
    createExperience: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.experience.create,
      method: 'PUT',
      tags: ['Experience'],
    }),

    // Get paginated list of experiences
    fetchExperiences: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.getList,
      tags: ['Experience'],
    }),

    // Get single experience detail (usually needs an ID parameter)
    fetchExperienceDetail: createQuery<any, any>(build, {
      url: HRLinkApiEndpoints.resume.experience.getDetail,
      tags: ['Experience'],
    }),

    // Update existing experience
    editExperience: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.experience.edit,
      method: 'PUT',
      tags: ['Experience'],
    }),

    // Delete experience
    deleteExperience: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.experience.delete,
      method: 'DELETE',
      tags: ['Experience'],
    }),

    // Get type of activity options (NEW)
    fetchTypeOfActivity: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.typeOfActivity,
      tags: ['Experience'],
    }),

    // Get reasons to quit options (NEW)
    fetchReasonsToQuit: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.experience.reasonToQuite,
      tags: ['Experience'],
    }),
  }),
});

export const {
  useFetchExperiencesQuery,
  useFetchExperienceDetailQuery,
  useCreateExperienceMutation,
  useEditExperienceMutation,
  useDeleteExperienceMutation,
  useFetchTypeOfActivityQuery,
  useFetchReasonsToQuitQuery,
} = experienceApiEndpoints;