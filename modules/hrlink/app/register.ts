import type { PluginModule } from '@hrbox/core/helpers';

import { CommonApi } from '@module/hrlink/features/common/apis';
import { JobsApi } from '@module/hrlink/features/jobs/apis';
import { DashboardApi } from '@module/hrlink/features/dashboard/apis';
import { CompanyApi } from '@module/hrlink/features/companies/apis';
import { SettingApi } from '@module/hrlink/features/setting/apis';
import { AwardApi, EducationApi, SkillsApi, CourseApi, ExperienceApi } from '@module/hrlink/features/resume/apis';

import { HRLinkRoutes } from '@module/hrlink/app/routes';
import { HRLinkMenu } from '@module/hrlink/app/menu';
import { HRLinkReducers } from '@module/hrlink/app/reducer';
import { HRLinkContents } from '@module/hrlink/app/contents';
import { HRLinkSubHeaders } from '@module/hrlink/app/subHeaders';

export const HRLinkPlugin: PluginModule = {
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
