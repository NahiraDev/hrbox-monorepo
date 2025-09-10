import { lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

export const page = {
  inpersonate: lazyLoad(()=> import('../features/inpersonate')),
  company:{
    companies: lazyLoad(()=> import('../features/companies/Companies')),
    offers: lazyLoad(()=> import('../features/companies/Offers')),
    favorites: lazyLoad(()=> import('../features/companies/Favorites')),
    requested: lazyLoad(()=> import('../features/companies/Requested')),
    companyInfo: lazyLoad(()=> import('../features/companies/CompanyInfo')),
  },
  dashboard: lazyLoad(()=> import('../features/dashboard')),
  job: {
    offers: lazyLoad(() => import('../features/jobs/Offers')),
    detail: lazyLoad(() => import('../features/jobs/JobDetail')),
    opportunities: lazyLoad(
      () => import('../features/jobs/opportunities'),
    ),
  },
};

export const HRLinkRoutes = createProjectRoutes('/hrlink', {
  inpersonate: page.inpersonate,
  companies: page.company.companies,
  favorites: page.company.favorites,
  companyInfo: page.company.companyInfo,
  offers: page.company.offers,
  requested: page.company.requested,
  dashboard: page.dashboard,
  jobOffers: page.job.offers,
  jobDetails: page.job.detail,
  jobOpportunities: page.job.opportunities,
});
