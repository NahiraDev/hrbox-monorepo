import { createEndpoint, createPaginatedEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';
import { HRLinkBaseApi } from '../../../../app/baseApiConfig';

export const SkillsApi = HRLinkBaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllSkills: createPaginatedEndpoint(build, HRLinkApiEndpoints.resume.skill.getAllSkills, 'GET', ['Skills']),
    createSkills: createEndpoint(build, HRLinkApiEndpoints.resume.skill.create, 'POST', ['Skills']),
    editSkills: createEndpoint(build, HRLinkApiEndpoints.resume.skill.edit, 'PUT', ['Skills']),
    deleteSkills: createEndpoint(build, HRLinkApiEndpoints.resume.skill.delete, 'DELETE', ['Skills']),
    fetchSoftSkills: createEndpoint(build, HRLinkApiEndpoints.resume.skill.getSoftSkill, 'GET', ['Skills']),
    fetchHardSkills: createEndpoint(build, HRLinkApiEndpoints.resume.skill.getHardSkill, 'GET', ['Skills']),
    getUserSoftSkills: createEndpoint(build, HRLinkApiEndpoints.resume.skill.getUserSoftSkills, 'GET', ['Skills']),
    getUserHardSkills: createEndpoint(build, HRLinkApiEndpoints.resume.skill.getUserHardSkills, 'GET', ['Skills']),
  }),
  overrideExisting: false,
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
} = SkillsApi;
