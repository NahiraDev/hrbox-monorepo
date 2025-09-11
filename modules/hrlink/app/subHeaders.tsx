import { lazyLoad } from 'core/routes';
import { HRLinkPaths } from './paths';

const ResumeSubHeader = lazyLoad(() => import('../features/resume/ResumeSubHeader'));
const JobSubHeader = lazyLoad(() => import('../features/jobs/JobSubHeader'));
const CompanySubHeader = lazyLoad(() => import('../features/companies/CompanySubHeader'));

export const HRLinkSubHeaders: any = [
  {
    path: HRLinkPaths.Impersonate,
    component: null,
  },
  {
    path: HRLinkPaths.Dashboard,
    component: null,
  },
  {
    path: HRLinkPaths.ResumeInformation,
    component: ResumeSubHeader,
  },
  {
    path: HRLinkPaths.ResumeExperience,
    component: ResumeSubHeader,
  },
  {
    path: HRLinkPaths.ResumeEducation,
    component: ResumeSubHeader,
  },
  {
    path: HRLinkPaths.ResumeCourse,
    component: ResumeSubHeader,
  },
  {
    path: HRLinkPaths.ResumeAwards,
    component: ResumeSubHeader,
  },
  {
    path: HRLinkPaths.ResumeHardSkills,
    component: ResumeSubHeader,
  },
  {
    path: HRLinkPaths.ResumeSoftSkills,
    component: ResumeSubHeader,
  },
  {
    path: HRLinkPaths.JobOffers,
    component: JobSubHeader,
  },
  {
    path: HRLinkPaths.JobDetail,
    component: JobSubHeader,
  },
  {
    path: HRLinkPaths.JobOpportunities,
    component: JobSubHeader,
  },
  {
    path: HRLinkPaths.Setting,
    component: null,
  },
  {
    path: HRLinkPaths.AllCompanies,
    component: CompanySubHeader,
  },
  {
    path: HRLinkPaths.CompanyJobOffers,
    component: CompanySubHeader,
  },
  {
    path: HRLinkPaths.CompanyFavorites,
    component: CompanySubHeader,
  },
  {
    path: HRLinkPaths.CompanyRequested,
    component: CompanySubHeader,
  },
  {
    path: HRLinkPaths.CompanyInformation,
    component: CompanySubHeader,
  },
];
