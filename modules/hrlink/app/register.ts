import type { PluginModule } from '@core/helpers';

import { CommonApi } from '@module/hrlink/features/common/apis';
import { JobsApi } from '@module/hrlink/features/jobs/apis';
import { DashboardApi } from '@module/hrlink/features/dashboard/apis';
import { CompanyApi } from '@module/hrlink/features/companies/apis';
import { SettingApi } from '@module/hrlink/features/setting/apis';
import { AwardApi, EducationApi, SkillsApi, CourseApi, ExperienceApi } from '@module/hrlink/features/resume/apis';

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
