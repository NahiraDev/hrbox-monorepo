import { lazyLoad , createProjectRoutes } from '@hrbox/core/routes';
import { HRLinkPaths } from '@module/hrlink/app/paths';

export const page = {
  impersonate: lazyLoad(() => import('@module/hrlink/features/impersonate')),
  dashboard: lazyLoad(() => import('@module/hrlink/features/dashboard')),
  setting: lazyLoad(() => import('@module/hrlink/features/setting')),
  company: {
    companies: lazyLoad(() => import('@module/hrlink/features/companies/Companies')),
    offers: lazyLoad(() => import('@module/hrlink/features/companies/Offers')),
    events: lazyLoad(() => import('@module/hrlink/features/companies/CompanyEvents')),
    favorites: lazyLoad(() => import('@module/hrlink/features/companies/Favorites')),
    requested: lazyLoad(() => import('@module/hrlink/features/companies/Requested')),
    companyInfo: lazyLoad(() => import('@module/hrlink/features/companies/CompanyInfo')),
  },
  job: {
    offers: lazyLoad(() => import('@module/hrlink/features/jobs/JobOffers')),
    detail: lazyLoad(() => import('@module/hrlink/features/jobs/JobDetail')),
    opportunities: lazyLoad(() => import('@module/hrlink/features/jobs/JobOpportunities')),
  },
  resume: {
    information: lazyLoad(() => import('@module/hrlink/features/resume/Information')),
    experience: lazyLoad(() => import('@module/hrlink/features/resume/Experience')),
    education: lazyLoad(() => import('@module/hrlink/features/resume/Education')),
    course: lazyLoad(() => import('@module/hrlink/features/resume/Courses')),
    awards: lazyLoad(() => import('@module/hrlink/features/resume/Awards')),
    hardSkills: lazyLoad(() => import('@module/hrlink/features/resume/HardSkills')),
    softSkills: lazyLoad(() => import('@module/hrlink/features/resume/SoftSkills')),
  },
};

export const HRLinkRoutes = createProjectRoutes('/hrlink', {
  [HRLinkPaths.Dashboard]: page.dashboard,
  [HRLinkPaths.Impersonate]: page.impersonate,
  [HRLinkPaths.AllCompanies]: page.company.companies,
  [HRLinkPaths.CompanyFavorites]: page.company.favorites,
  [HRLinkPaths.CompanyEvents]: page.company.events,
  [HRLinkPaths.CompanyInformation]: page.company.companyInfo,
  [HRLinkPaths.CompanyJobOffers]: page.company.offers,
  [HRLinkPaths.CompanyRequested]: page.company.requested,
  [HRLinkPaths.JobOffers]: page.job.offers,
  [HRLinkPaths.JobDetail]: page.job.detail,
  [HRLinkPaths.JobOpportunities]: page.job.opportunities,
  [HRLinkPaths.ResumeAwards]: page.resume.awards,
  [HRLinkPaths.ResumeInformation]: page.resume.information,
  [HRLinkPaths.ResumeHardSkills]: page.resume.hardSkills,
  [HRLinkPaths.ResumeSoftSkills]: page.resume.softSkills,
  [HRLinkPaths.ResumeExperience]: page.resume.experience,
  [HRLinkPaths.ResumeEducation]: page.resume.education,
  [HRLinkPaths.ResumeCourse]: page.resume.course,
  [HRLinkPaths.Setting]: page.setting,
});
