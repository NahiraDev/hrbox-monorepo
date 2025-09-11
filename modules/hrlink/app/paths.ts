import { createPaths } from '../../../core';

export const HRLinkPaths = createPaths('/hrlink', {
  Impersonate: '/impersonate',
  Dashboard: '/dashboard',
  ResumeInformation: '/resume/information',
  ResumeExperience: '/resume/experience',
  ResumeEducation: '/resume/education',
  ResumeCourse: '/resume/course',
  ResumeAwards: '/resume/awards',
  ResumeHardSkills: '/resume/hard-skills',
  ResumeSoftSkills: '/resume/soft-skills',
  JobOffers: '/job/offers',
  JobOpportunities: '/job/opportunities',
  JobDetail: '/job/:id',
  Setting: '/setting',
  AllCompanies: '/company/all-companies',
  CompanyJobOffers: '/company/job-offers',
  CompanyFavorites: '/company/favorites',
  CompanyRequested: '/company/requested',
  CompanyInformation: '/company/company-information',
});
