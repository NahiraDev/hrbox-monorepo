import { createPaths } from '../../../core';

export const HRLinkPaths = createPaths('/hrlink', {
  job: {
    offers: '/offers',
    detail: '/detail',
    opportunities: '/opportunities',
  },
});
