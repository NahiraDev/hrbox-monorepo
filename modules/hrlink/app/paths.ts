import { createPaths } from 'core/routes';

export const HRLinkPaths = createPaths('/hrlink', {
  job: {
    offers: '/offers',
    detail: '/detail',
    opportunities: '/opportunities',
  },
});
