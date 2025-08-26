import { createPaths, lazyLoad } from '../../../core';
import { createProjectRoutes } from '../../../core';

export const page = {
  job: {
    offers: lazyLoad(() => import('@module/hrlink/features/jobs/offers')),
    detail: lazyLoad(() => import('@module/hrlink/features/jobs/jobDetail')),
    opportunities: lazyLoad(
      () => import('@module/hrlink/features/jobs/opportunities'),
    ),
  },
};

export const HRLinkRoutes = createProjectRoutes('/hrlink', {
  jobOffers: page.job.offers,
  jobDetails: page.job.detail,
  jobOpportunities: page.job.opportunities,
});
