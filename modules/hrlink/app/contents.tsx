import { lazyLoad } from '@core/routes';
import { HRLinkPaths } from './paths';

const Impersonate = lazyLoad(() => import('../features/impersonate'));
const Dashboard = lazyLoad(() => import('../features/dashboard'));
const Setting = lazyLoad(() => import('../features/setting'));
const AllCompanies = lazyLoad(() => import('../features/companies/Companies'));
const CompanyJobOffers = lazyLoad(() => import('../features/companies/Offers'));
const CompanyEvents = lazyLoad(() => import('../features/companies/CompanyEvents'));
const CompanyFavorites = lazyLoad(() => import('../features/companies/Favorites'));
const CompanyRequested = lazyLoad(() => import('../features/companies/Requested'));
const CompanyInformation= lazyLoad(() => import('../features/companies/CompanyInfo'));
const JobOffers = lazyLoad(() => import('../features/jobs/JobOffers'));
const JobDetail = lazyLoad(() => import('../features/jobs/JobDetail'));
const JobOpportunities = lazyLoad(() => import('../features/jobs/JobOpportunities'));
const ResumeInformation = lazyLoad(() => import('../features/resume/Information'));
const ResumeExperience = lazyLoad(() => import('../features/resume/Experience'));
const ResumeEducation = lazyLoad(() => import('../features/resume/Education'));
const ResumeCourse = lazyLoad(() => import('../features/resume/Courses'));
const ResumeAwards = lazyLoad(() => import('../features/resume/Awards'));
const ResumeHardSkills = lazyLoad(() => import('../features/resume/HardSkills'));
const ResumeSoftSkills = lazyLoad(() => import('../features/resume/SoftSkills'));

export const HRLinkContents: any = [
  {
    path: HRLinkPaths.Impersonate,
    component: Impersonate,
  },
  {
    path: HRLinkPaths.Dashboard,
    component: Dashboard,
  },
  {
    path: HRLinkPaths.ResumeInformation,
    component: ResumeInformation,
  },
  {
    path: HRLinkPaths.ResumeExperience,
    component: ResumeExperience,
  },
  {
    path: HRLinkPaths.ResumeEducation,
    component: ResumeEducation,
  },
  {
    path: HRLinkPaths.ResumeCourse,
    component: ResumeCourse,
  },
  {
    path: HRLinkPaths.ResumeAwards,
    component: ResumeAwards,
  },
  {
    path: HRLinkPaths.ResumeHardSkills,
    component: ResumeHardSkills,
  },
  {
    path: HRLinkPaths.ResumeSoftSkills,
    component: ResumeSoftSkills,
  },
  {
    path: HRLinkPaths.JobOffers,
    component: JobOffers,
  },
  {
    path: HRLinkPaths.JobDetail,
    component: JobDetail,
  },
  {
    path: HRLinkPaths.JobOpportunities,
    component: JobOpportunities,
  },
  {
    path: HRLinkPaths.Setting,
    component: Setting,
  },
  {
    path: HRLinkPaths.AllCompanies,
    component: AllCompanies,
  },
  {
    path: HRLinkPaths.CompanyJobOffers,
    component: CompanyJobOffers,
  },
  {
    path: HRLinkPaths.CompanyEvents,
    component: CompanyEvents,
  },
  {
    path: HRLinkPaths.CompanyFavorites,
    component: CompanyFavorites,
  },
  {
    path: HRLinkPaths.CompanyRequested,
    component: CompanyRequested,
  },
  {
    path: HRLinkPaths.CompanyInformation,
    component: CompanyInformation,
  },
];
