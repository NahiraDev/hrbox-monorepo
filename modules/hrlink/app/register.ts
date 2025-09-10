import type { PluginModule } from '../../../core';

import { CommonApi } from '../features/common/apis';
import { JobsApi } from '../features/jobs/apis';
import { DashboardApi } from '../features/dashboard/apis';
import { CompanyApi } from '../features/companies/apis';
import { SettingApi } from '../features/setting/apis';
import { AwardApi, EducationApi, SkillsApi, CourseApi } from '../features/resume/apis';

import { HRLinkRoutes } from './routes';
import { HRLinkMenu } from './menu';
import { HRLinkReducers } from './reducer';

const HRLinkPlugin: PluginModule = {
  name: 'hrlink',
  reducers: HRLinkReducers,
  apis: [CommonApi, JobsApi, DashboardApi, AwardApi, EducationApi, SkillsApi, CourseApi, CompanyApi, SettingApi],
  routes: HRLinkRoutes.routes,
  menu: HRLinkMenu(),
};

export default HRLinkPlugin;
