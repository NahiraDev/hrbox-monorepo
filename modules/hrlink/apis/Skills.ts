import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createPaginatedQuery, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';


export const skillsApiEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build:any) => ({
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

    fetchProfessionalSkills: createPaginatedQuery<any> (build, {
      url: HRLinkApiEndpoints.resume.skill.getProfessionalSkills,
      tags: ['Skills']
    }),

    fetchAllSkills: createPaginatedQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.skill.getAllSkills,
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
  useFetchAllSkillsQuery,
  useCreateSkillsMutation,
  useEditSkillsMutation,
  useDeleteSkillsMutation,
  useFetchSoftSkillsQuery,
  useFetchHardSkillsQuery,
  useGetUserSoftSkillsQuery,
  useGetUserHardSkillsQuery,
  useFetchProfessionalSkillsQuery
} = skillsApiEndpoints;