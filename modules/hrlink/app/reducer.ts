import { createRootReducer } from '../../../core';
import { JobsApi } from '../features/jobs/apis';
import { DashboardApi } from '../features/dashboard/apis';
import { AwardApi } from '../features/resume/apis';
import { CompanyApi } from '../features/companies/apis';

export const HRLinkReducers = createRootReducer({
  [JobsApi.reducerPath]: JobsApi.reducer,
  [DashboardApi.reducerPath]: DashboardApi.reducer,
  [AwardApi.reducerPath]: AwardApi.reducer,
  [CompanyApi.reducerPath]: CompanyApi.reducer,
});
