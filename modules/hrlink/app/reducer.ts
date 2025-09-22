import { createRootReducer } from '@core/redux';
import { JobsApi } from '@module/hrlink/features/jobs/apis';
import { DashboardApi } from '@module/hrlink/features/dashboard/apis';
import { AwardApi, EducationApi, SkillsApi, CourseApi, ExperienceApi } from '@module/hrlink/features/resume/apis';
import { CompanyApi } from '@module/hrlink/features/companies/apis';
import { SettingApi } from '@module/hrlink/features/setting/apis';
import { CommonApi } from '@module/hrlink/features/common/apis';

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
