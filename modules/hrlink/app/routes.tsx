import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';
import { HRLinkPaths } from './paths';

export const page = {
  impersonate: lazyLoad(() => import('../features/impersonate')),
  dashboard: lazyLoad(() => import('../features/dashboard')),
  setting: lazyLoad(() => import('../features/setting')),
  company: {
    companies: lazyLoad(() => import('../features/companies/Companies')),
    offers: lazyLoad(() => import('../features/companies/Offers')),
    favorites: lazyLoad(() => import('../features/companies/Favorites')),
    requested: lazyLoad(() => import('../features/companies/Requested')),
    companyInfo: lazyLoad(() => import('../features/companies/CompanyInfo')),
  },
  job: {
    offers: lazyLoad(() => import('../features/jobs/JobOffers')),
    detail: lazyLoad(() => import('../features/jobs/JobDetail')),
    opportunities: lazyLoad(() => import('../features/jobs/JobOpportunities')),
  },
  resume: {
    information: lazyLoad(() => import('../features/resume/Information')),
    experience: lazyLoad(() => import('../features/resume/Experience')),
    education: lazyLoad(() => import('../features/resume/Education')),
    course: lazyLoad(() => import('../features/resume/Courses')),
    awards: lazyLoad(() => import('../features/resume/Awards')),
    hardSkills: lazyLoad(() => import('../features/resume/HardSkills')),
    softSkills: lazyLoad(() => import('../features/resume/SoftSkills')),
  },
};

export const HRLinkRoutes = createProjectRoutes('/hrlink', {
  [HRLinkPaths.Dashboard]: page.dashboard,
  [HRLinkPaths.Impersonate]: page.impersonate,
  [HRLinkPaths.AllCompanies]: page.company.companies,
  [HRLinkPaths.CompanyFavorites]: page.company.favorites,
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
