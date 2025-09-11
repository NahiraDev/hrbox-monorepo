import { createRootReducer } from '../../../core';
import { JobsApi } from '../features/jobs/apis';
import { DashboardApi } from '../features/dashboard/apis';
import { AwardApi, EducationApi, SkillsApi, CourseApi , ExperienceApi } from '../features/resume/apis';
import { CompanyApi } from '../features/companies/apis';
import { SettingApi } from '../features/setting/apis';
import { CommonApi } from '../features/common/apis';

export const HRLinkReducers = createRootReducer({
  [CommonApi.reducerPath]: CommonApi.reducer,
  [JobsApi.reducerPath]: JobsApi.reducer,
  [DashboardApi.reducerPath]: DashboardApi.reducer,
  [AwardApi.reducerPath]: AwardApi.reducer,
  [SkillsApi.reducerPath]: SkillsApi.reducer,
  [CourseApi.reducerPath]: CourseApi.reducer,
  [CompanyApi.reducerPath]: CompanyApi.reducer,
  [EducationApi.reducerPath]: EducationApi.reducer,
  [ExperienceApi.reducerPath]: ExperienceApi.reducer,
  [SettingApi.reducerPath]: SettingApi.reducer,
});
