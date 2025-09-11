import type { PluginModule } from '../../../core';

import { CommonApi } from '../features/common/apis';
import { JobsApi } from '../features/jobs/apis';
import { DashboardApi } from '../features/dashboard/apis';
import { CompanyApi } from '../features/companies/apis';
import { SettingApi } from '../features/setting/apis';
import { AwardApi, EducationApi, SkillsApi, CourseApi, ExperienceApi } from '../features/resume/apis';

import { HRLinkRoutes } from './routes';
import { HRLinkMenu } from './menu';
import { HRLinkReducers } from './reducer';
import { HRLinkContents } from './contents';
import { HRLinkSubHeaders } from './subHeaders';

const HRLinkPlugin: PluginModule = {
  name: 'hrlink',
  reducers: HRLinkReducers,
  apis: [
    CommonApi,
    JobsApi,
    DashboardApi,
    AwardApi,
    EducationApi,
    ExperienceApi,
    SkillsApi,
    CourseApi,
    CompanyApi,
    SettingApi,
  ],
  routes: HRLinkRoutes.routes,
  contents: HRLinkContents,
  subHeaders: HRLinkSubHeaders,
  menu: HRLinkMenu(),
};

export default HRLinkPlugin;
