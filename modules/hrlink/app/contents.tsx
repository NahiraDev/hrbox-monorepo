import { Paths } from "@hrbox/modules/paths";
import { lazyRouteComponent } from "@tanstack/react-router";

const Impersonate = lazyRouteComponent(() => import('../pages/impersonate'));
const Dashboard = lazyRouteComponent(() => import('../pages/dashboard'));
const Setting = lazyRouteComponent(() => import('../pages/setting'));
const AllCompanies = lazyRouteComponent(() => import('../pages/companies/Companies'));
const CompanyJobOffers = lazyRouteComponent(() => import('../pages/companies/Offers'));
const CompanyEvents = lazyRouteComponent(() => import('../pages/companies/CompanyEvents'));
const CompanyFavorites = lazyRouteComponent(() => import('../pages/companies/Favorites'));
const CompanyRequested = lazyRouteComponent(() => import('../pages/companies/Requested'));
const CompanyInformation= lazyRouteComponent(() => import('../pages/companies/CompanyInfo'));
const JobOffers = lazyRouteComponent(() => import('../pages/jobs/JobOffers'));
const JobDetail = lazyRouteComponent(() => import('../pages/jobs/JobDetail'));
const JobOpportunities = lazyRouteComponent(() => import('../pages/jobs/JobOpportunities'));
const ResumeInformation = lazyRouteComponent(() => import('../pages/resume/Information'));
const ResumeExperience = lazyRouteComponent(() => import('../pages/resume/Experience'));
const ResumeEducation = lazyRouteComponent(() => import('../pages/resume/Education'));
const ResumeCourse = lazyRouteComponent(() => import('../pages/resume/Courses'));
const ResumeAwards = lazyRouteComponent(() => import('../pages/resume/Awards'));
const ResumeHardSkills = lazyRouteComponent(() => import('../pages/resume/HardSkills'));
const ResumeSoftSkills = lazyRouteComponent(() => import('../pages/resume/SoftSkills'));

export const HRLinkContents: any = [
  {
    path: Paths.HRLink.Impersonate,
    component: Impersonate,
  },
  {
    path: Paths.HRLink.Dashboard,
    component: Dashboard,
  },
  {
    path: Paths.HRLink.ResumeInformation,
    component: ResumeInformation,
  },
  {
    path: Paths.HRLink.ResumeExperience,
    component: ResumeExperience,
  },
  {
    path: Paths.HRLink.ResumeEducation,
    component: ResumeEducation,
  },
  {
    path: Paths.HRLink.ResumeCourse,
    component: ResumeCourse,
  },
  {
    path: Paths.HRLink.ResumeAwards,
    component: ResumeAwards,
  },
  {
    path: Paths.HRLink.ResumeHardSkills,
    component: ResumeHardSkills,
  },
  {
    path: Paths.HRLink.ResumeSoftSkills,
    component: ResumeSoftSkills,
  },
  {
    path: Paths.HRLink.JobOffers,
    component: JobOffers,
  },
  {
    path: Paths.HRLink.JobDetail,
    component: JobDetail,
  },
  {
    path: Paths.HRLink.JobOpportunities,
    component: JobOpportunities,
  },
  {
    path: Paths.HRLink.Setting,
    component: Setting,
  },
  {
    path: Paths.HRLink.AllCompanies,
    component: AllCompanies,
  },
  {
    path: Paths.HRLink.CompanyJobOffers,
    component: CompanyJobOffers,
  },
  {
    path: Paths.HRLink.CompanyEvents,
    component: CompanyEvents,
  },
  {
    path: Paths.HRLink.CompanyFavorites,
    component: CompanyFavorites,
  },
  {
    path: Paths.HRLink.CompanyRequested,
    component: CompanyRequested,
  },
  {
    path: Paths.HRLink.CompanyInformation,
    component: CompanyInformation,
  },
];
