import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const skillsApi = createModuleApi({
  reducerPath: 'HRLinkApi',
  baseUrl: '/DesktopModules/Freelancer/api',
  tagTypes: ['Skills'],
  requiresAuth: true,
  autoToast: true,
});

export const skillsApiEndpoints = skillsApi.injectEndpoints({
  endpoints: (build:any) => ({
    fetchAllSkills: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.skill.getAllSkills,
      tags: ['Skills'],
    }),

    createSkills: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.skill.create,
      method: 'POST',
      tags: ['Skills'],
    }),

    editSkills: createMutation<any , any>(build, {
      url: HRLinkApiEndpoints.resume.skill.edit,
      method: 'PUT',
      tags: ['Skills'],
    }),

    deleteSkills: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.skill.delete,
      method: 'DELETE',
      tags: ['Skills'],
    }),

    fetchSoftSkills: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.skill.getSoftSkill,
      tags: ['Skills'],
    }),

    fetchHardSkills: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.skill.getHardSkill,
      tags: ['Skills'],
    }),

    getUserSoftSkills: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.skill.getUserSoftSkills,
      tags: ['Skills'],
    }),

    getUserHardSkills: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.skill.getUserHardSkills,
      tags: ['Skills'],
    }),
  }),
});

export const {
  useLazyFetchAllSkillsQuery,
  useCreateSkillsMutation,
  useEditSkillsMutation,
  useDeleteSkillsMutation,
  useLazyFetchSoftSkillsQuery,
  useLazyFetchHardSkillsQuery,
  useLazyGetUserSoftSkillsQuery,
  useLazyGetUserHardSkillsQuery,
} = skillsApiEndpoints;