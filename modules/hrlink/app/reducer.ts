import { createRootReducer } from '../../../core';
import { JobsApi } from '../features/jobs/apis';
import { DashboardApi } from '../features/dashboard/apis';
import { AwardApi } from '../features/resume/apis';
import { CompanyApi } from '../features/companies/apis';
import { EducationApi } from '@module/hrlink/features/resume/apis/education';
import { SettingApi } from '@module/hrlink/features/setting/apis';
import { CommonApi } from '@module/hrlink/features/common/apis.ts';

export const HRLinkReducers = createRootReducer({
  [CommonApi.reducerPath]: CompanyApi.reducer,
  [JobsApi.reducerPath]: JobsApi.reducer,
  [DashboardApi.reducerPath]: DashboardApi.reducer,
  [AwardApi.reducerPath]: AwardApi.reducer,
  [CompanyApi.reducerPath]: CompanyApi.reducer,
  [EducationApi.reducerPath]: CompanyApi.reducer,
  [SettingApi.reducerPath]: CompanyApi.reducer,
});
