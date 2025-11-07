import { createBaseApi } from '@core/apis';

const HRLinkTags = [
  'Company',
  'Common',
  'Jobs',
  'Dashboard',
  'Award',
  'Skills',
  'Course',
  'Education',
  'Experience',
  'Setting',
] as const;

export const HRLinkBaseApi = createBaseApi(
  'https://hrlink.hrbox.me:50443',
  'HRLinkReducers',
  HRLinkTags,
);
